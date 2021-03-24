import styled from 'styled-components'

export default function RecipeCard({ recipes }) {
    return (
        <>
            {recipes && recipes.map((recipe) =>
            (<CardWrapper
                key={recipe.id}
            >
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
                <p>You need:</p>
                {recipe.missedIngredients.map((missedIngredient) => (
                    <li>{missedIngredient.original}</li>
                ))}
                <p>You have:</p>
                {recipe.usedIngredients.map((usedIngredient) => (
                    <li>{usedIngredient.original}</li>
                ))}
            </CardWrapper>
            ))}

        </>
    )
}

const CardWrapper = styled.section`
background: lightgrey;
margin-bottom: 10px;
`