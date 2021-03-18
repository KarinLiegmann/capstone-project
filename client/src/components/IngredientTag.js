import styled from 'styled-components'
import { ReactComponent as CheckmarkIcon } from '../assets/checkmark-icon.svg'
import { ReactComponent as TrashIcon } from '../assets/trash-icon.svg'

export default function IngredientTag({ text }) {
    return (
        <IngredientsWrapper>
            <StyledIngredientTag>
                {text}
                <IconWrapper><CheckmarkIcon /></IconWrapper></StyledIngredientTag>
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

const IconWrapper = styled.span`
outline: green;

svg {
    path {
        fill: red;
    }
}
`