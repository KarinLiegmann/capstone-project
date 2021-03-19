import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaMinus } from 'react-icons/fa'

export default function IngredientTags({ ingredients, onDeleteTag, onToggleStatus }) {
    return (
        <Wrapper>
            {ingredients.map((ingredient) =>
            (<TagWrapper
                key={ingredient.id}
            >
                <StyledIngredientTag
                    onClick={() => onToggleStatus(ingredient.id)}
                    isActive={ingredient.isActive}
                >
                    {ingredient.ingredientName}
                </StyledIngredientTag>
                <DeleteIcon
                    onClick={() => onDeleteTag(ingredient.id)} />
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
text-decoration: ${({ isActive }) => isActive ? 'none' : 'line-through'};
text-decoration-thickness: 2px;
`

const DeleteIcon = styled(FaMinus)`
color: var(--clr-accent2);
font-size: var(--fs-h2);
justify-self: flex-end;
`

IngredientTags.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteTag: PropTypes.func.isRequired,
    onToggleStatus: PropTypes.func.isRequired,
}
