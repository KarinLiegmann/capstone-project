import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { loadFromLocal, saveToLocal } from './library/localStorage'

import RecipeSearch from './pages/RecipeSearch'
import RecipeResults from './pages/RecipeResults'

import Header from './components/Header'

function App() {

  const [open, setOpen] = useState(false)

  const initialIngredient = [{
    ingredientName: '',
    id: 0,
    isActive: true
  }]

  const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? initialIngredient)

  const [activeIngredients, setActiveIngredients] = useState(loadFromLocal('activeIngredients') ?? [])

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

  useEffect(() => {
    filterActiveIngredients()
  }, [ingredients])



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