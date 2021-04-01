import { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaHeart } from 'react-icons/fa'

import RecipeCards from '../components/RecipeCards'
import { ButtonMain } from '../components/Buttons'

export default function RecipeResults({ error, recipes, likedRecipes, onDeleteRecipe, onGetNextRecipes, onLikeRecipe, getRecipeResults }) {

    return (
        <Wrapper>
            {recipes.length !== 0 &&
                <>
                    <h2>Here is what we found</h2>
                    <RecipeCards
                        recipes={recipes}
                        onDeleteRecipe={onDeleteRecipe}
                        onLikeRecipe={onLikeRecipe} />
                    <h2>Recipes left: {recipes.length} </h2>

                    <p>Click on the left Button to delete and on the right Button to keep!</p>
                </>
            }

            {recipes.length === 0 && likedRecipes.length !== 0 &&
                <>
                    <h2>Recipes Liked: {likedRecipes.length}</h2>
                    <LikedRecipesList>
                        {likedRecipes && likedRecipes.map((likedRecipe) => (
                            <li key={likedRecipe.id}><LikeIcon /> {likedRecipe.title}</li>
                        ))}
                    </LikedRecipesList>

                    <ButtonMain
                        text="All Done!"
                        isActive={true} />

                    <p>Nothing to your taste?</p>

                    <ButtonMain
                        text="Try Again"
                        isActive={true}
                        onHandleClick={onGetNextRecipes} />
                </>
            }

            {recipes.length === 0 && likedRecipes.length === 0 &&
                <>
                    <p>Nothing to your taste?</p>
                    <ButtonMain
                        text="Try Again"
                        isActive={true}
                        onHandleClick={onGetNextRecipes} />
                </>
            }

            {error && <ErrorMessage>Sorry, we couldn't find any recipes!</ErrorMessage>}

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

const ErrorMessage = styled.p`
color: var(--clr-accent2);
`


RecipeResults.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteRecipe: PropTypes.func.isRequired,
    onLikeRecipe: PropTypes.func.isRequired
}