import styled from 'styled-components'
import { FaCheck } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'

export default function IngredientTags({ ingredients, onToggleStatus }) {
    return (
        <Wrapper>

            {ingredients.map((ingredient, index) =>
            (<TagWrapper>

                <StyledIngredientTag

                    key={ingredient.id}
                    onClick={() => onToggleStatus(ingredient.id)}
                    isActive={ingredient.isActive}
                >
                    {ingredient.ingredientName}
                    <Checkmark />

                </StyledIngredientTag>
                <DeleteIcon />
            </TagWrapper>


            ))}



        </Wrapper>
    )
}


const Wrapper = styled.section`
display: flex;
flex-direction: column;
margin: 1rem 0 1rem 1.5rem;
`

const TagWrapper = styled.div`
align-items: center;
display: flex;
justify-content: space-between;
`

const StyledIngredientTag = styled.div`
align-items: center;
background: ${({ isActive }) => isActive ? 'var(--clr-accent2)' : 'var(--clr-accent2-light)'};
border-radius: 5px;
box-shadow: ${({ isActive }) => isActive ? 'var(--bs-accent2)' : 'var(--bs-accent2-light)'};
color: var(--clr-light);
display: flex;
font-size: var(--fs-body);
font-weight: var(--fw-bold);
justify-self: flex-start;
margin: .5rem 0;
padding: .2rem .8rem;
`
const Checkmark = styled(FaCheck)`
margin-left: 1rem;
`
const DeleteIcon = styled(FaMinus)`
color: var(--clr-accent2);
font-size: var(--fs-h2);
justify-self: flex-end;
`
