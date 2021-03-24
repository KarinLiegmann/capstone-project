import styled from 'styled-components'

export default function Button({ text, onHandleClick }) {
    return (
        <StyledButton
            onClick={onHandleClick}>
            {text}
        </StyledButton>
    )
}

const StyledButton = styled.button`
background: var(--clr-accent1);
border: none;
border-radius: 10px;
box-shadow: var(--bs-accent1);
color: var(--clr-light);
font-size: var(--fs-h3);
font-weight: var(--fw-bold);
padding: .5em 1.2em;
`
