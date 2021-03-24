import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { loadFromLocal, saveToLocal } from './library/localStorage'

import RecipeSearch from './pages/RecipeSearch'
import RecipeResults from './pages/RecipeResults'

import Header from './components/Header'
import axios from 'axios'


function App() {

  const [open, setOpen] = useState(false)

  const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? [])
  const [activeIngredients, setActiveIngredients] = useState(loadFromLocal('activeIngredients') ?? [])

  const [recipes, setRecipes] = useState(loadFromLocal('recipes') ?? [])

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
    console.log(queryString)

    try {
      const searchResults =
        await axios.get(`http://localhost:4000/recipes`, {
          params: {
            ranking: 2,
            number: 2,
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
        likes: recipe.likes
      }))
      setRecipes(recipeData)
      console.log(recipeData)
      saveToLocal('recipes', recipeData)


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
                recipes={recipes} />
            </Route>

          </Switch>

        </main>

      </div >
    </Router>
  );
}

export default App;