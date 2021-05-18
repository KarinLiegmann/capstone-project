import styled from 'styled-components'
import Burger from './Burger'
import Menu from './Menu'

export default function MobileHeader({ open, setOpen }) {
    return (
        <StyledHeader>
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    @media screen and (min-width: 1024px) {
    display: none;
}`




