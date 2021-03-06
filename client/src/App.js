import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import { loadFromLocal, saveToLocal } from './library/localStorage'
import { deleteItem, filterActiveIngredients, toggleIngredient } from './library/ingredientsHelpers'

import { isNewEntry, isValidId } from './library/validateFunctions'
import { getRecipeData, getInstructions } from './library/axiosRequests'

import RecipeSearch from './pages/RecipeSearch'
import RecipeResults from './pages/RecipeResults'
import RecipeSelection from './pages/RecipeSelection'
import RecipeInstructions from './pages/RecipeInstructions'
import FavouriteRecipes from './pages/FavouriteRecipes'

import MobileHeader from './components/Navigation/MobileHeader'
import DesktopHeader from './components/Navigation/DesktopHeader'
import Modal from './components/Modal/Modal'


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

  const history = useHistory()


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
    setActiveIngredients(allActiveIngredients)
  }, [ingredients])

  const getRecipeResults = async () => {
    setLoading(true)
    const recipeData = await getRecipeData(activeIngredients, offsetCounter)
    if (recipeData) {
      saveToLocal('recipes', recipeData)
      setRecipes(recipeData)
      setLoading(false)
      setError(false)
      setLikedRecipes([])
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
    setRecipes(recipes)
  }, [recipes])

  useEffect(() => {
    saveToLocal('likedRecipes', likedRecipes)
    setLikedRecipes(likedRecipes)
  }, [likedRecipes])

  useEffect(() => {
    saveToLocal('favouriteRecipes', favouriteRecipes)
    setFavouriteRecipes(favouriteRecipes)
  }, [favouriteRecipes])

  useEffect(() => {
    setCompleteRecipe(completeRecipe)
  }, [completeRecipe])


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
    history.push(`/recipe/${recipeToRender.id}`)
    setCompleteRecipe(loadFromLocal('completeRecipe'))
  }



  function removeFavouriteRecipe(idToDelete) {
    const favouriteRecipesToKeep = deleteItem(favouriteRecipes, idToDelete)
    setFavouriteRecipes(favouriteRecipesToKeep)
    saveToLocal('favouriteRecipes', favouriteRecipesToKeep)
  }



  const getNextRecipeResults = async () => {
    setLoading(true)
    setError(false)
    increaseOffsetCounter()
    const nextRecipeData = await getRecipeData(activeIngredients, offsetCounter + 3)

    if (nextRecipeData.length === 0) {
      setLoading(false)
      setError(true)
    } else {
      setLoading(false)
      setRecipes(nextRecipeData)
      saveToLocal('recipes', nextRecipeData)
      setError(false)
    }
  }

  function resetOffsetCouter() {
    setOffsetCounter(0)
  }

  function addToFavouriteRecipes(recipeToAdd) {
    const newRecipe = {
      ...recipeToAdd,
      isFavourite: true
    }
    if (isNewEntry(favouriteRecipes, newRecipe)) {
      setFavouriteRecipes([newRecipe, ...favouriteRecipes])
      saveToLocal('favouriteRecipes', favouriteRecipes)
    }
  }

  function showModal(recipeData) {
    setModalRecipe(recipeData)
    setOpenModal(!openModal)
  }

  function closeModal() {
    setOpenModal(false)
  }

  return (

    <div className="App">
      <MobileHeader
        open={open}
        setOpen={setOpen} />

      <DesktopHeader />

      <main>
        <Switch>

          <Route exact path="/">
            <RecipeSearch
              ingredients={ingredients}
              onGetRecipeResults={getRecipeResults}
              onCreateIngredient={addIngredient}
              onDeleteTag={deleteIngredient}
              onToggleStatus={toggleActiveState}
              onResetOffsetCounter={resetOffsetCouter} />
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
          </Route>

          <Route path="/selections">
            <RecipeSelection
              recipes={likedRecipes}
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
              isFavourite={completeRecipe.isFavourite}
              onCreateIngredient={addIngredient}
              onDeleteFavourite={removeFavouriteRecipe}
              onDeleteTag={deleteIngredient}
              onLikeRecipe={addToFavouriteRecipes}
            // onToggleStatus={ignoreStatus}
            />
          </Route>

          <Route path="/favourites">
            <FavouriteRecipes
              recipes={favouriteRecipes}
              onOpenModal={showModal}
              onShowRecipePage={showRecipePage}
              onDeleteFavourite={removeFavouriteRecipe}
            />
            <Modal
              openModal={openModal}
              recipeData={modalRecipe}
              onCloseModal={closeModal} />
          </Route>

        </Switch>
      </main>

    </div>
  );
}

export default App;

