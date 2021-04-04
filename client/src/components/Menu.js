import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function Menu({ open, setOpen }) {
  return (
    <StyledMenu open={open}>
      <Link to="/"><a onClick={() => setOpen(!open)}>Recipe Search</a></Link>
      <a href="/">Favourite Recipes</a>
      <Link to="/selections"><a onClick={() => setOpen(!open)}>Last Search Results</a></Link>
    </StyledMenu>
  )
}


const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--clr-dark);
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: var(--fs-h3);
    text-transform: uppercase;
    padding: 1.5rem 0;
    font-weight: var(--fw-bold);
    letter-spacing: 0.4rem;
    color: var(--clr-accent1);
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: 576px) {
      font-size: 1.5rem;
    }

    &:hover {
      color: var(--clr-accent2);
    }
  }
`;

