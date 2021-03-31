import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { loadFromLocal, saveToLocal } from './library/localStorage'
import { addNewIngredient, deleteItem, filterActiveIngredients, toggleIngredient } from './library/ingredientsHelpers'

import { getRecipeData } from './library/axiosRequests'
//import { GetRecipeData } from './hooks/useFetch'

import RecipeSearch from './pages/RecipeSearch'
import RecipeResults from './pages/RecipeResults'

import Header from './components/Header'
import axios from 'axios'


function App() {

  const [open, setOpen] = useState(false)

  const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? [])
  const [activeIngredients, setActiveIngredients] = useState(loadFromLocal('activeIngredients') ?? [])

  const [recipes, setRecipes] = useState(loadFromLocal('recipes') ?? [])
  const [likedRecipes, setLikedRecipes] = useState(loadFromLocal('likedRecipes') ?? [])

  const [offsetCounter, setOffsetCounter] = useState(0)

  const addIngredient = (ingredient) => {
    const newIngredient = addNewIngredient(ingredient)
    setIngredients([newIngredient, ...ingredients])
  }

  const deleteIngredient = (idToDelete) => {
    const ingredientsToKeep = deleteItem(ingredients, idToDelete)
    setIngredients(ingredientsToKeep)
    setActiveIngredients(ingredientsToKeep)
  }

  const toggleActiveState = (idToToggle) => {
    const updatedIngredients = toggleIngredient(ingredients, idToToggle)
    setIngredients(updatedIngredients)
  }

  useEffect(() => {
    filterActiveIngredients(ingredients)
  }, [ingredients])

  const getRecipeResults = async () => {
    const recipeData = await getRecipeData(activeIngredients)
    setRecipes(recipeData)

  }





  /*const getRecipeResults = async () => {
    const ingredientNames = activeIngredients.map(ingredient => ingredient.name)
    let queryString = ingredientNames.join(',+').replaceAll(' ', '%')
  
    try {
      const searchResults =
        await axios.get(`http://localhost:4000/recipes`, {
          params: {
            instructionsRequired: true,
            ranking: 1,
            number: 3,
            offset: offsetCounter,
            ingredients: queryString
          },
        })
  
      const recipeData = searchResults.data.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        usedIngredientCount: recipe.usedIngredientCount,
        missedIngredientCount: recipe.missedIngredientCount,
        missedIngredients: recipe.missedIngredients,
        usedIngredients: recipe.usedIngredients,
        unusedIngredients: recipe.unusedIngredients,
        likes: recipe.likes,
        isLiked: false
      }))
      setRecipes(recipeData)
      saveToLocal('recipes', recipeData)
    } catch (error) {
      console.error(error.message)
    }
  }*/

  function deleteRecipe(idToDelete) {
    const recipesToKeep = deleteItem(recipes, idToDelete)
    setRecipes(recipesToKeep)
    saveToLocal('recipes', recipesToKeep)
  }

  function addToLikedRecipes(recipeToAdd) {
    const newRecipe = {
      ...recipeToAdd,
      isLiked: true
    }
    setLikedRecipes([newRecipe, ...likedRecipes])

    const allUnlikedRecipes = recipes.filter(recipe => recipe.id !== recipeToAdd.id);
    setRecipes(allUnlikedRecipes)
    saveToLocal('recipes', allUnlikedRecipes)
  }

  useEffect(() => {
    saveToLocal('likedRecipes', likedRecipes)
  }, [likedRecipes])

  function increaseOffsetCounter() {
    let counter = offsetCounter + 3
    setOffsetCounter(counter)
  }

  function getNextRecipeResults() {
    increaseOffsetCounter()
    console.log(offsetCounter)
  }

  return (
    <Router>
      <div className="App">
        <Header
          open={open}
          setOpen={setOpen} />

        <main>
          <Switch>

            <Route exact path="/">
              <RecipeSearch
                ingredients={ingredients}
                onGetRecipeResults={() => getRecipeResults()}
                onCreateIngredient={addIngredient}
                onDeleteTag={deleteIngredient}
                onToggleStatus={toggleActiveState} />
            </Route>

            <Route path="/results">
              <RecipeResults
                recipes={recipes}
                getRecipeResults={getRecipeResults}
                likedRecipes={likedRecipes}
                onDeleteRecipe={deleteRecipe}
                onLikeRecipe={addToLikedRecipes}
                onGetNextRecipes={getNextRecipeResults} />
            </Route>

          </Switch>
        </main>

      </div >
    </Router>
  );
}

export default App;