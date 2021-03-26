import RecipeCardSmall from '../components/RecipeCardSmall'

export default function RecipeSelection({ likedRecipes }) {
    return (
        <section>
            <p>Selection</p>
            <RecipeCardSmall
                likedRecipes={likedRecipes} />
        </section>
    )
}