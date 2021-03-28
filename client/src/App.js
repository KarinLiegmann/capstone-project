import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { loadFromLocal, saveToLocal } from './library/localStorage'

import RecipeSearch from './pages/RecipeSearch'
import RecipeResults from './pages/RecipeResults'
import RecipeSelection from './pages/RecipeSelection'
import RecipeInstructions from './pages/RecipeInstructions'

import Header from './components/Header'
import axios from 'axios'
import { ButtonSecondary } from './components/Buttons'


function App() {

  const [open, setOpen] = useState(false)

  const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? [])
  const [activeIngredients, setActiveIngredients] = useState(loadFromLocal('activeIngredients') ?? [])

  const [recipes, setRecipes] = useState(loadFromLocal('recipes') ?? [])
  const [likedRecipes, setLikedRecipes] = useState(loadFromLocal('likedRecipes') ?? [])

  const [recipeInstructions, setRecipeInstructions] = useState({})

  function addIngredient(ingredient) {
    const newIngredient =
    {
      name: ingredient.name,
      id: ingredient.id,
      isActive: true
    }
    setIngredients([newIngredient, ...ingredients])
  }

  const deleteIngredient = (idToDelete) => {
    const ingredientsToKeep = ingredients.filter(ingredient => (ingredient.id !== idToDelete))
    setIngredients(ingredientsToKeep)
    setActiveIngredients(ingredientsToKeep)
  }

  const toggleActiveState = (idToToggle) => {
    const updatedIngredients = ingredients.map(ingredient => {
      if (ingredient.id === idToToggle) {
        ingredient.isActive = !ingredient.isActive
      }
      return ingredient;
    })
    setIngredients(updatedIngredients)
  }

  function filterActiveIngredients() {
    const allActiveIngredients = ingredients.filter(ingredient => ingredient.isActive);
    setActiveIngredients(allActiveIngredients)
    saveToLocal('ingredients', ingredients)
    saveToLocal('activeIngredients', allActiveIngredients)
  }

  useEffect(() => {
    filterActiveIngredients()
  }, [ingredients])

  const getRecipeResults = async () => {
    const ingredientNames = activeIngredients.map(ingredient => ingredient.name)
    let queryString = ingredientNames.join(',+').replaceAll(' ', '%')

    try {
      const searchResults =
        await axios.get(`http://localhost:4000/recipes`, {
          params: {
            instructionsRequired: true,
            ranking: 1,
            number: 6,
            offset: 0,
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
  }

  function deleteRecipe(idToFind) {
    const recipesToKeep = recipes.filter(recipe => recipe.id !== idToFind)
    setRecipes(recipesToKeep)
    saveToLocal('recipes', recipesToKeep)
  }

  function addToLikedRecipes(recipe) {
    const newRecipe = {
      ...recipe,
      isLiked: true
    }
    setLikedRecipes([newRecipe, ...likedRecipes])
  }

  useEffect(() => {
    saveToLocal('likedRecipes', likedRecipes)
  }, [likedRecipes])

  function removeLikedRecipes() {
    const allUnlikedRecipes = recipes.filter(recipe => !recipe.isLiked);
    deleteRecipe()
    saveToLocal('recipes', allUnlikedRecipes)
  }

  function testFunction() {
    console.log('test')
  }

  const getRecipeInstructions = async () => {
    let recipeId = 196490 // params, not query in der Abfrage-URL!!! 

    try {
      const searchResults =
        await axios.get(`http://localhost:4000/recipeInstructions/${recipeId}`)

      const recipeData = searchResults.data
      console.log(recipeData)
      setRecipeInstructions(recipeData)
      saveToLocal('recipeInstructions', recipeData)
    } catch (error) {
      console.error(error.message)
    }
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
                onGetRecipeResults={getRecipeResults}
                onCreateIngredient={addIngredient}
                onDeleteTag={deleteIngredient}
                onToggleStatus={toggleActiveState} />
            </Route>

            <Route path="/results">
              <RecipeResults
                recipes={recipes}
                onDeleteRecipe={deleteRecipe}
                onLikeRecipe={addToLikedRecipes}
                onGetNextRecipes={testFunction} />
            </Route>

            <Route path="/selections">
              <RecipeSelection
                likedRecipes={likedRecipes}
              />
            </Route>

            <Route path="/recipe">
              <RecipeInstructions

              />
              <ButtonSecondary
                text="Get Recipe Test"
                onHandleClick={getRecipeInstructions} />
            </Route>



          </Switch>
        </main>

      </div >
    </Router>
  );
}

export default App;