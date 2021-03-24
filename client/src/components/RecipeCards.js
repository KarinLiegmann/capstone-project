import styled from 'styled-components'
import img from '../assets/RecipeCard_Background.png'
import { FaHeart } from 'react-icons/fa'
import { RiDislikeLine } from 'react-icons/ri'

export default function RecipeCard({ recipes }) {
    return (
        <>
            {recipes && recipes.map((recipe) =>
            (<CardWrapper
                key={recipe.id}
            >
                <CardContent>
                    <img src={recipe.image} alt={recipe.title} />
                    <h3>{recipe.title}</h3>
                    <IconsWrapper>
                        <DislikeIcon />
                        <LikeIcon />
                    </IconsWrapper>
                    <IngredientsWrapper>

                        <ul>
                            <p>You need:</p>
                            {recipe.missedIngredients.map((missedIngredient) => (
                                <li>{missedIngredient.original}</li>
                            ))}
                        </ul>


                        <ul>
                            <p>You have:</p>
                            {recipe.usedIngredients.map((usedIngredient) => (
                                <li>{usedIngredient.original}</li>
                            ))}
                        </ul>
                    </IngredientsWrapper>
                </CardContent>
            </CardWrapper >
            ))
            }

        </>
    )
}

const CardWrapper = styled.section`
background-image: url(${img});
background-size: 100% auto;
background-repeat: no-repeat;
background-position-x: center;
display: flex;
justify-content: center;
margin-bottom: 10px;
width: 90%;
`
const CardContent = styled.div`
padding: 3.2rem 1.5rem;

img {
    border-radius: 10px;
    width: 60%;
}

p {    
    font-weight: var(--fw-bold);
    margin: 0;
    text-align: left;
}

li {
    text-align: left;
}
`

const IngredientsWrapper = styled.div`
display: flex;
`

const IconsWrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 0 .5rem;
`


const DislikeIcon = styled(RiDislikeLine)`
color: var(--clr-accent2-light);
font-size: var(--fs-h1);
justify-self: flex-end;
`

const LikeIcon = styled(FaHeart)`
color: var(--clr-accent2-light);
font-size: var(--fs-h1);
justify-self: flex-end;
`