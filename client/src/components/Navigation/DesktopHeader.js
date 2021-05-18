import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import Logo from '../../assets/AppLogo.png'

import { AiOutlineSearch } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'


export default function DesktopHeader() {
    return (
        <StyledHeader>
            <img src={Logo} alt="" />
            <div>
                <NavLink exact to="/"><SearchIcon />Find Recipes</NavLink>
                <NavLink to="/selections"><LikeIcon />Search Results</NavLink>
                <NavLink to="/favourites"><FavouriteIcon />Favourite Recipes</NavLink>
            </div>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
display: none;

@media screen and (min-width: 1024px) {
    align-items: center;
    background: var(--clr-accent1);
    display: flex;
    font-size: var(--fs-h2);

    justify-content: space-between;
    padding: 0 1.5rem;
    width: 100%;

div {
    display: flex;
    color: white;  
}

a {
    color: white;
    margin: 0 1.5rem;
    text-decoration: none;
}


.active {
    font-weight: var(--fw-bold);
    text-decoration: underline;
}

img {
    width: 8%;
    padding: 5px 0 10px 0;
}
}
`

const SearchIcon = styled(AiOutlineSearch)`
color: var(--clr-light);
font-size: var(--fs-h2);
margin-right: .7rem;
`

const FavouriteIcon = styled(AiFillStar)`
color: var(--clr-light);
font-size: var(--fs-h2);
margin-right: .7rem;
`

const LikeIcon = styled(FaHeart)`
color: var(--clr-light);
font-size: var(--fs-h3);
margin-right: .7rem;
`