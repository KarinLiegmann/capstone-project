import RecipeCardSmall from '../components/RecipeCardSmall'

export default function RecipeSelection({ likedRecipes }) {
    return (
        <section>
            <h2>My Recipes</h2>
            <RecipeCardSmall
                likedRecipes={likedRecipes} />
        </section>
    )
}