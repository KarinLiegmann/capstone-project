import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

import RecipeCards from '../components/RecipeCards'
import { ButtonMain, ButtonSecondary } from '../components/Buttons'

export default function RecipeResults({ recipes, likedRecipes, onDeleteRecipe, onGetNextRecipes, onLikeRecipe }) {



    return (
        <Wrapper>
            <h2>Here is what we found</h2>
            <RecipeCards
                recipes={recipes}
                onDeleteRecipe={onDeleteRecipe}
                onLikeRecipe={onLikeRecipe} />
            <h2>Recipes left: {recipes.length} </h2>
            <p>Click on the left Button to delete and on the right Button to keep!</p>

            <LikedRecipesList>
                {likedRecipes && likedRecipes.map((likedRecipe) => (
                    <li><LikeIcon /> {likedRecipe.title}</li>
                ))}
            </LikedRecipesList>


            {recipes.length !== 0 &&
                <>
                    <ButtonMain
                        text="All Done!"
                        isActive={false} />

                    <p>Nothing to your taste?</p>

                    <ButtonMain
                        text="Try Again"
                        isActive={false}
                    />
                </>
            }

            {recipes.length === 0 &&
                <>
                    <ButtonMain
                        text="All Done!"
                        isActive={true} />

                    <p>Nothing to your taste?</p>

                    <ButtonMain
                        text="Try Again"
                        isActive={true}
                        onClick={() => onGetNextRecipes()} />
                </>
            }



            <Link to="/">
                <ButtonSecondary
                    text="Go Back"
                    isActive={true} />
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.section`
align-items: center;
display: flex;
flex-direction: column;
margin: 5% 0;

button {
    margin-bottom: 1.5rem;
}
`

const LikedRecipesList = styled.ul`
margin-bottom: 2rem;
text-align: left;

li {
    list-style: none;
}
`

const LikeIcon = styled(FaHeart)`
color: var(--clr-accent2);
font-size: 1rem;
`


RecipeResults.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteRecipe: PropTypes.func.isRequired,
    onLikeRecipe: PropTypes.func.isRequired
}