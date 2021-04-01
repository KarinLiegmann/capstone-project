import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom'

import { loadFromLocal, saveToLocal } from './library/localStorage'
import { addNewIngredient, deleteItem, filterActiveIngredients, toggleIngredient } from './library/ingredientsHelpers'

import { getRecipeData } from './library/axiosRequests'

import RecipeSearch from './pages/RecipeSearch'
import RecipeResults from './pages/RecipeResults'

import Header from './components/Header'
import { ButtonSecondary } from './components/Buttons'



function App() {

  const [open, setOpen] = useState(false)

  const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? [])
  const [activeIngredients, setActiveIngredients] = useState(loadFromLocal('activeIngredients') ?? [])

  const [recipes, setRecipes] = useState(loadFromLocal('recipes') ?? [])
  const [likedRecipes, setLikedRecipes] = useState(loadFromLocal('likedRecipes') ?? [])

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

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
    const allActiveIngredients = filterActiveIngredients(ingredients)
    saveToLocal('ingredients', ingredients)
    saveToLocal('activeIngredients', allActiveIngredients)
  }, [ingredients])

  const getRecipeResults = async () => {
    setLoading(true)

    const recipeData = await getRecipeData(activeIngredients, offsetCounter)

    if (recipeData.length === 0) {
      setLoading(false)
      setError(true)
    } else {
      setRecipes(recipeData)
      saveToLocal('recipes', recipeData)
      setLoading(false)
      setError(false)
    }
  }

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


  const increaseOffsetCounter = () => {
    setOffsetCounter(offsetCounter + 6)
    return offsetCounter
  }

  const getNextRecipeResults = async () => {
    setLoading(true)

    increaseOffsetCounter()
    const nextRecipeData = await getRecipeData(activeIngredients, offsetCounter + 6)

    if (nextRecipeData.length === 0) {
      setLoading(false)
      setError(true)
      setOffsetCounter(0)
    } else {
      setLoading(false)
      setRecipes(nextRecipeData)
      saveToLocal('recipes', nextRecipeData)
      setError(false)
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
                onGetRecipeResults={() => getRecipeResults()}
                onCreateIngredient={addIngredient}
                onDeleteTag={deleteIngredient}
                onToggleStatus={toggleActiveState} />
            </Route>

            <Route path="/results">
              <RecipeResults
                error={error}
                loading={loading}
                recipes={recipes}
                getRecipeResults={getRecipeResults}
                likedRecipes={likedRecipes}
                onDeleteRecipe={deleteRecipe}
                onLikeRecipe={addToLikedRecipes}
                onGetNextRecipes={() => getNextRecipeResults()} />
              <Link to="/">
                <ButtonSecondary
                  text="Go Back"
                  isActive={true} />
              </Link>
            </Route>

          </Switch>
        </main>

      </div >
    </Router>
  );
}

export default App;