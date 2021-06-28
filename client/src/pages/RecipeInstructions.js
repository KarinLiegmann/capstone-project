import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { AiFillStar } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'

import BackIcon from '../components/Navigation/BackIcon'
import { ButtonMain } from '../components/Navigation/Buttons'
import IngredientTags from '../components/Ingredients/IngredientTags'
import IngredientsList from '../components/Ingredients/IngredientsList'


export default function RecipeInstructions({ activeIngredients, onDeleteTag, completeRecipe, onLikeRecipe, onToggleStatus, isFavourite, onDeleteFavourite }) {

    return (<>
        <Link to="/selections">
            <BackIcon />
        </Link>

        {completeRecipe &&
            <Wrapper className="pageWrapper">
                <header>
                    <img src={completeRecipe.image} alt={completeRecipe.title} />
                    <h2>{completeRecipe.title}</h2>
                </header>

                <IconWrapper isFavourite={isFavourite}>
                    {completeRecipe.isFavourite && <DeleteIcon onClick={() => onDeleteFavourite(completeRecipe.id)} />}

                    <FavouriteIcon
                        onClick={() => onLikeRecipe(completeRecipe)}
                        isFavourite={isFavourite} />
                </IconWrapper>


                <CookingIngredients>
                    <h3>Cooking Ingredients</h3>
                    <div>
                        <IngredientsList ingredients={completeRecipe.missedIngredients} />
                        <IngredientsList ingredients={completeRecipe.usedIngredients} />
                    </div>
                </CookingIngredients>

                <Instructions>
                    <h3>Cooking Instructions</h3>
                    <div>
                        {completeRecipe.steps && completeRecipe.steps.length > 0 && completeRecipe.steps[0].map((step, index) => (
                            <p><span>Step {index + 1}:</span> {step}</p>
                        ))}
                    </div>

                    {completeRecipe.steps && completeRecipe.steps.length === 0 && <div><p>We're sorry, but no instructions could be found. Feel free to get creative with your ingredients!</p></div>}
                </Instructions>

                <TagWrapper>
                    <h3>All done with cooking?</h3>
                    <p>Remove the ingredients you have used up:</p>
                    <IngredientTags
                        ingredients={activeIngredients}
                        onDeleteTag={onDeleteTag}
                        onToggleStatus={onToggleStatus}
                    />
                </TagWrapper>

                <Link to="/" >
                    <ButtonMain
                        isActive
                        text="All Done!" />
                </Link>
            </Wrapper >
        }
    </>
    )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
margin-bottom: 2rem;
margin-top: 25%;

@media screen and (min-width: 1024px) {
        margin-top: 5%;
    }

header {
    padding: 0 2rem;

    img {
        border-radius: 20px;
        max-width: 500px;      
}    
}
`

const Instructions = styled.ul`
list-style: none;
padding: 1.5rem;
text-align: left;

@media screen and (min-width: 1024px) {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: space-around;

            h3 {
                grid-column: 1 / 2;
                margin-top: 0;
            }

            
            div { 
                grid-column: 2 / 4;
                display: flex;
                flex-wrap: wrap;
                width: 700px; 
            }

            p {
                width: 300px;
                margin-left: 3rem;
            }
        }

li {
    margin-top: 1rem;
}

span {
    font-weight: var(--fw-bold);
}
`

const CookingIngredients = styled.ul`
text-align: left;

@media screen and (min-width: 1024px) {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: space-around;

            h3 {
                grid-column: 1 / 2;
                margin-top: 0;
            }

            
            div { 
                grid-column: 2 / 4;
                display: flex;
                flex-wrap: wrap;
                width: 700px; 
            }

            li {
                width: 300px;
                margin-left: 3rem;
            }
        }
`

const TagWrapper = styled.section`
padding: 1.5rem;
text-align: left;

@media screen and (min-width: 1024px) {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: space-around;

            h3, p {
                grid-column: 1 / 2;
                margin-top: 0;
                width: 270px;
            }

            div {
                grid-column: 2 / 4;
                margin-left: 2rem;
                margin-right: 15rem;
            }
        }
`

const IconWrapper = styled.div`
display: flex;
justify-content: ${({ isFavourite }) => isFavourite ? 'space-between' : 'flex-end'};

@media screen and (min-width: 1024px) {
            margin: 2rem 5rem 4rem 5rem;
        }
`


const FavouriteIcon = styled(AiFillStar)`
align-self: flex-end;
color: ${({ isFavourite }) => isFavourite ? 'var(--clr-accent2)' : 'var(--clr-accent2-light)'};
font-size: 2.7rem;
margin-right: 2rem;

&:hover,
&:active {
    transform: scale(1.2);
    color: var(--clr-accent2);
    cursor: pointer;
}
`

const DeleteIcon = styled(RiDeleteBinLine)`
align-self: flex-start;
color: var(--clr-dark);
font-size: 2.7rem;
margin-left: 2rem;

&:hover,
&:active {
    transform: scale(1.2);
    color: var(--clr-accent2);
    cursor: pointer;
}
`

