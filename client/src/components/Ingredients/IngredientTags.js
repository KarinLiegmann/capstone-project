import styled from 'styled-components'
import PropTypes from 'prop-types'

import { GiCheckMark } from 'react-icons/gi'
import { RiDeleteBinLine } from 'react-icons/ri'

export default function IngredientTags({ ingredients, onDeleteTag, onToggleStatus, isToggable }) {
    return (

        <IngredientsWrapper
            data-testid="ingredient-tags">
            {ingredients.map((ingredient) =>
            (<TagWrapper
                key={ingredient.id}
            >

                {isToggable &&
                    <StyledIngredientTag
                        onClick={() => onToggleStatus(ingredient.id)}
                        isActive={ingredient.isActive}
                        data-testid="ingredient-tag"
                    >
                        {ingredient.name} < CheckMark isActive={ingredient.isActive} />

                    </StyledIngredientTag>}

                {!isToggable &&
                    <StyledIngredientTag
                        isActive={ingredient.isActive}
                        data-testid="ingredient-tag"
                    >
                        {ingredient.name} < CheckMark isActive={ingredient.isActive} />

                    </StyledIngredientTag>
                }

                <DeleteIcon
                    onClick={() => onDeleteTag(ingredient.id)} />
            </TagWrapper>
            ))}
        </IngredientsWrapper>
    )
}


const IngredientsWrapper = styled.section`
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

const DeleteIcon = styled(RiDeleteBinLine)`
color: var(--clr-dark);
font-size: var(--fs-h2);
justify-self: flex-end;
`

const CheckMark = styled(GiCheckMark)`
color: var(--clr-light);
display: ${({ isActive }) => isActive ? 'block' : 'none'};
margin-left: .5rem;
`

IngredientTags.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** Delete an Ingredient-Tag by clicking on the Trash-Icon */
    onDeleteTag: PropTypes.func.isRequired,
    /** Toggles an ingredient as active or inactive by clicking on the Ingredient-Tag */
    onToggleStatus: PropTypes.func,
}
