import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom'

import { loadFromLocal, saveToLocal } from './library/localStorage'
import { deleteItem, filterActiveIngredients, toggleIngredient } from './library/ingredientsHelpers'

import { isNewEntry, isValidId } from './library/validateFunctions'
import { getRecipeData, getInstructions } from './library/axiosRequests'

import RecipeSearch from './pages/RecipeSearch'
import RecipeResults from './pages/RecipeResults'
import RecipeSelection from './pages/RecipeSelection'
import RecipeInstructions from './pages/RecipeInstructions'
import FavouriteRecipes from './pages/FavouriteRecipes'

import Header from './components/Header'
import Modal from './components/Modal'
import { ButtonSecondary } from './components/Buttons'


function App() {

  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalRecipe, setModalRecipe] = useState({})

  const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? [])
  const [activeIngredients, setActiveIngredients] = useState(loadFromLocal('activeIngredients') ?? [])

  const [recipes, setRecipes] = useState(loadFromLocal('recipes') ?? [])
  const [likedRecipes, setLikedRecipes] = useState(loadFromLocal('likedRecipes') ?? [])


  const [completeRecipe, setCompleteRecipe] = useState(loadFromLocal('completeRecipe') ?? {})
  const [favouriteRecipes, setFavouriteRecipes] = useState(loadFromLocal('favouriteRecipes') ?? [])


  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [offsetCounter, setOffsetCounter] = useState(0)




  const addIngredient = (ingredient) => {
    const newIngredient =
    {
      ...ingredient,
      isActive: true
    }
    if (isValidId(newIngredient) && isNewEntry(ingredients, newIngredient)) {
      setIngredients([newIngredient, ...ingredients])
    }
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
    if (recipeData) {
      setRecipes(recipeData)
      saveToLocal('recipes', recipeData)
      setLoading(false)
      setError(false)
    } else {
      setLoading(false)
      setError(true)
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
    if (isNewEntry(likedRecipes, newRecipe)) {
      setLikedRecipes([newRecipe, ...likedRecipes])
    }

    const allUnlikedRecipes = recipes.filter(recipe => recipe.id !== recipeToAdd.id);
    setRecipes(allUnlikedRecipes)
    saveToLocal('recipes', allUnlikedRecipes)
  }

  useEffect(() => {
    saveToLocal('recipes', recipes)
  }, [recipes])

  useEffect(() => {
    saveToLocal('likedRecipes', likedRecipes)
  }, [likedRecipes])

  useEffect(() => {
    saveToLocal('favouriteRecipes', favouriteRecipes)
  }, [favouriteRecipes])


  const increaseOffsetCounter = () => {
    setOffsetCounter(offsetCounter + 6)
    return offsetCounter
  }

  const getRecipeInstructions = async (recipeToRender) => {
    const recipeData = await getInstructions(recipeToRender)
    setCompleteRecipe(recipeData)
    saveToLocal('completeRecipe', recipeData)
  }

  const showRecipePage = async (recipeToRender) => {
    saveToLocal('recipe', recipeToRender)
    await getRecipeInstructions(recipeToRender)
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

  function addToFavouriteRecipes(recipeToAdd) {
    const newRecipe = {
      ...recipeToAdd,
      isFavourite: true
    }
    if (isNewEntry(favouriteRecipes, newRecipe)) {
      setFavouriteRecipes([newRecipe, ...favouriteRecipes])
    }
  }

  function showModal(recipeData) {
    setModalRecipe(recipeData)
    setOpenModal(!openModal)
  }

  function closeModal() {
    setOpenModal(false)
  }

  function ignoreStatus() {
    console.log('test')
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
                error={error}
                loading={loading}
                recipes={recipes}
                getRecipeResults={getRecipeResults}
                likedRecipes={likedRecipes}
                onDeleteRecipe={deleteRecipe}
                onLikeRecipe={addToLikedRecipes}
                onOpenModal={showModal}
                onGetNextRecipes={() => getNextRecipeResults()} />
              <Modal
                openModal={openModal}
                recipeData={modalRecipe}
                onCloseModal={closeModal} />
              <Link to="/">
                <ButtonSecondary
                  text="Go Back"
                  isActive={true} />
              </Link>
            </Route>

            <Route path="/selections">
              <RecipeSelection
                likedRecipes={likedRecipes}
                onShowRecipePage={showRecipePage}
                onOpenModal={showModal}
              />
              <Modal
                openModal={openModal}
                recipeData={modalRecipe}
                onCloseModal={closeModal} />
            </Route>

            <Route path="/recipe">
              <RecipeInstructions
                activeIngredients={activeIngredients}
                completeRecipe={completeRecipe}
                ingredients={activeIngredients}
                onCreateIngredient={addIngredient}
                onDeleteTag={deleteIngredient}
                onLikeRecipe={addToFavouriteRecipes}
                onToggleStatus={ignoreStatus}
              />
            </Route>

            <Route path="/favourites">
              <FavouriteRecipes
                favouriteRecipes={favouriteRecipes}
                onOpenModal={showModal}
                onShowRecipePage={showRecipePage}
              />
              <Modal
                openModal={openModal}
                recipeData={modalRecipe}
                onCloseModal={closeModal} />
            </Route>

          </Switch>
        </main>

      </div >
    </Router>
  );
}

export default App;