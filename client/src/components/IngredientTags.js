import styled from 'styled-components'
import { FaCheck } from 'react-icons/fa'

export default function IngredientTags({ ingredients, onToggleStatus }) {
    return (
        <IngredientsWrapper>

            {ingredients.map((ingredient, index) =>
            (<StyledIngredientTag

                key={ingredient.id}
                onClick={() => onToggleStatus(ingredient.id)}
                isActive={ingredient.isActive}
            >
                {ingredient.ingredientName}
                <Checkmark />
            </StyledIngredientTag>

            ))}



        </IngredientsWrapper>
    )
}


const IngredientsWrapper = styled.section`
align-items: flex-start;
display: flex;
flex-direction: column;
margin-left: 1.5rem;
`
const StyledIngredientTag = styled.div`
align-items: center;
background: ${(props) => props.isActive ? 'var(--clr-accent2)' : 'var(--clr-accent2-light)'};
border-radius: 5px;
box-shadow: ${(props) => props.isActive ? 'var(--bs-accent2)' : 'var(--bs-accent2-light)'};
color: var(--clr-light);
display: flex;
font-size: var(--fs-body);
font-weight: var(--fw-bold);
padding: .2rem .8rem;
`
const Checkmark = styled(FaCheck)`
margin-left: 1rem;
`
