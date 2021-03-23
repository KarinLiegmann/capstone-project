import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { loadFromLocal, saveToLocal } from './library/localStorage'

import RecipeSearch from './pages/RecipeSearch'

import Header from './components/Header'

function App() {

  const [open, setOpen] = useState(false)

  const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? [])
  const [activeIngredients, setActiveIngredients] = useState(loadFromLocal('activeIngredients') ?? [])

  function addIngredient(ingredient) {
    const newIngredient =
    {
      ingredientName: ingredient.name,
      id: ingredient.id,
      isActive: true
    }
    setIngredients([newIngredient, ...ingredients])
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
        <Router>
          <Switch>

            <Route exact path="/">
              <RecipeSearch
                ingredients={ingredients}
                onCreateIngredient={addIngredient}
              />
            </Route>

          </Switch>
        </Router>
      </main>


    </div>
  );
}

export default App;