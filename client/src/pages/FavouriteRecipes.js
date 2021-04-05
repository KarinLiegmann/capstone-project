import RecipeCardSmall from '../components/RecipeCardSmall'

export default function FavouriteRecipes({ favouriteRecipes, onShowRecipePage }) {
    return (
        <>
            <h2>Your Favourite Recipes</h2>
            <RecipeCardSmall
                likedRecipes={favouriteRecipes}
                onShowRecipePage={onShowRecipePage} />
        </>
    )
}