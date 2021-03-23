import styled from 'styled-components'

export default function Menu({ open }) {
  return (
    <StyledMenu open={open}>
      <a href="/">Profile</a>
      <a href="/">Favourite Recipes</a>
      <a href="/">Last Search Results</a>
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

