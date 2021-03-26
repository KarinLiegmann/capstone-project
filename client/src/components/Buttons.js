import styled from 'styled-components'

export { ButtonMain, ButtonSecondary }

function ButtonMain({ isActive, text, onHandleClick }) {
    return (
        <StyledMainButton
            onClick={onHandleClick}
            isActive={isActive}>
            {text}
        </StyledMainButton>
    )
}

const StyledMainButton = styled.button`
background: ${({ isActive }) => isActive ? 'var(--clr-accent1)' : 'var(--clr-accent1-light)'};
border: none;
border-radius: 10px;
box-shadow: ${({ isActive }) => isActive ? 'var(--bs-accent1)' : 'var(--bs-accent1-light)'};
color: ${({ isActive }) => isActive ? 'var(--clr-light)' : 'var(--clr-accent1)'};
font-size: var(--fs-h3);
font-weight: var(--fw-bold);
padding: .5em 1.2em;
`

function ButtonSecondary({ isActive, text, onHandleClick }) {
    return (
        <StyledSecondaryButton
            onClick={onHandleClick}
            isActive={isActive}>
            {text}
        </StyledSecondaryButton>
    )
}

const StyledSecondaryButton = styled.button`
background: ${({ isActive }) => isActive ? 'var(--clr-accent2)' : 'var(--clr-accent2-light)'};
border: none;
border-radius: 10px;
box-shadow: ${({ isActive }) => isActive ? 'var(--bs-accent2)' : 'var(--bs-accent2-light)'};
color: ${({ isActive }) => isActive ? 'var(--clr-light)' : 'var(--clr-accent2)'};
font-size: var(--fs-h3);
font-weight: var(--fw-bold);
padding: .5em 1.2em;
`
