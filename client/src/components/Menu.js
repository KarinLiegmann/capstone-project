import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { AiOutlineSearch } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'

import Logo from '../assets/AppLogo.png'

export default function Menu({ open, setOpen }) {
  return (
    <StyledMenu open={open}>
      <img src={Logo} alt="logo" />
      <NavLink to="/"><h2 onClick={() => setOpen(!open)}><SearchIcon /> Recipe Search</h2></NavLink>

      <NavLink to="/selections"><h2 onClick={() => setOpen(!open)}><LikeIcon /> Last Search Results</h2></NavLink>

      <NavLink to="/favourites"><h2 onClick={() => setOpen(!open)}><FavouriteIcon /> Favourite Recipes</h2></NavLink>
    </StyledMenu>
  )
}


const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  background: var(--clr-accent1);
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 20;
  
  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: var(--fs-h3);
    text-transform: uppercase;
    padding: 0;
    font-weight: var(--fw-bold);
    letter-spacing: 0.2rem;
    color: var(--clr-light);
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: 576px) {
      font-size: 1rem;
    }

    &:hover,
    &:active {
      color: var(--clr-accent2);
    }
  }

  img {
    align-self: center;
    margin-bottom: 3rem;
    margin-top: 1rem;
    width: 60%;
  }
`;

const SearchIcon = styled(AiOutlineSearch)`
color: var(--clr-light);
font-size: var(--fs-h1);
margin-right: 1rem;
`

const FavouriteIcon = styled(AiFillStar)`
color: var(--clr-light);
font-size: var(--fs-h1);
margin-right: 1rem;
`

const LikeIcon = styled(FaHeart)`
color: var(--clr-light);
font-size: var(--fs-h2);
margin-right: 1rem;
`

