import styled from 'styled-components'

import styled from 'styled-components'

import Burger from './Burger'
import Menu from './Menu'



export default function Header({ open, setOpen }) {
    return (
        <StyledHeader>
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
        </ StyledHeader>
    )
}

const StyledHeader = styled.header`
height: 10%;
`




