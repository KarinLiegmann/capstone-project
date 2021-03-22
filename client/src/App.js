import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { loadFromLocal, saveToLocal } from './library/localStorage'

import RecipeSearch from './pages/RecipeSearch'
import RecipeResults from './pages/RecipeResults'

import Header from './components/Header'
import axios from 'axios'


function App() {

  const [open, setOpen] = useState(false)

  const initialIngredient = [{
    ingredientName: '',
    id: 0,
    isActive: true
  }]

  const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? initialIngredient)

  const [activeIngredients, setActiveIngredients] = useState(loadFromLocal('activeIngredients') ?? [])

  const [recipes, setRecipes] = useState([])

  function addIngredient(ingredient) {
    const newIngredient =
    {
      ingredientName: ingredient.name,
      id: ingredient.id,
      isActive: true
    }
    setIngredients([...ingredients, newIngredient])
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

  const getRecipeResults = async () => {
    const ingredientNames = activeIngredients.map(ingredient => ingredient.ingredientName)

    let queryString = ingredientNames.join(',+').replaceAll(' ', '%')
    console.log(queryString)

    const value = activeIngredients[1].ingredientName
    console.log(value)

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
      console.log(recipes)


    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getRecipeResults()
    console.log(recipes)
  }, [activeIngredients])












  return (
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

          <Route exact path="/results">
            <RecipeResults />
          </Route>

        </Switch>
      </main>

    </div>
  );
}

export default App;