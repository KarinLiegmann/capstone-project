import styled from 'styled-components'

export default function Button({ isActive, text, onHandleClick }) {
    return (
        <StyledButton
            onClick={onHandleClick}
            isActive={isActive}>
            {text}
        </StyledButton>
    )
}

const StyledButton = styled.button`
background: ${({ isActive }) => isActive ? 'var(--clr-accent1)' : 'var(--clr-accent1-light)'};
border: none;
border-radius: 10px;
box-shadow: ${({ isActive }) => isActive ? 'var(--bs-accent1)' : 'var(--bs-accent1-light)'};
color: ${({ isActive }) => isActive ? 'var(--clr-light)' : 'var(--clr-accent1)'};
font-size: var(--fs-h3);
font-weight: var(--fw-bold);
padding: .5em 1.2em;
`
