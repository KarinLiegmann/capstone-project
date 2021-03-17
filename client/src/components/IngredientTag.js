import styled from 'styled-components'

export default function IngredientTag({ ingredientName }) {
    return (
        <IngredientWrapper>
            <StyledIngredientTag>{ingredientName}<ToggleSign>&#10003;</ToggleSign></StyledIngredientTag>
        </IngredientWrapper>
    )
}


const IngredientWrapper = styled.section`
align-items: flex-start;
display: flex;
flex-direction: column;
margin-left: 1.5rem;
`
const StyledIngredientTag = styled.div`
background: var(--clr-accent2);
border-radius: 5px;
box-shadow: var(--bs-accent2);
color: var(--clr-light);
display: flex;
font-size: var(--fs-body);
font-weight: var(--fw-bold);
padding: .2rem .8rem;
`
const ToggleSign = styled.span`
margin-left: 1rem;
`