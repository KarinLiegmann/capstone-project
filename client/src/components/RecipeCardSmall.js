import styled from 'styled-components'
import PropTypes from 'prop-types'
import header from '../assets/CardSmallHeader.png'
import footer from '../assets/CardSmallFooter.png'

import { ButtonSecondary } from './Buttons'

export default function RecipeCardSmall({ likedRecipes, onShowRecipePage, onOpenModal }) {

    return (
        <>
            {likedRecipes && likedRecipes.map((likedRecipe) =>
            (<>
                <CardWrapper
                    key={likedRecipe.id}>
                    <ContentWrapper>
                        <header>
                            <img src={likedRecipe.image} alt={likedRecipe.title} />
                            <h3>{likedRecipe.title}</h3>
                        </header>


                        <ButtonSecondary
                            text="Cook Me"
                            isActive
                            onHandleClick={() => onShowRecipePage(likedRecipe)}
                        />


                        {likedRecipe.missedIngredients.length > 0 &&
                            <p><span>You need:</span> {likedRecipe.missedIngredients.map((missingIngredient => missingIngredient.name.toLowerCase())).join(', ')}
                            </p>
                        }

                        <InfoButton onClick={() => onOpenModal(likedRecipe)}>
                            Click for details
                        </InfoButton>
                    </ContentWrapper>
                </CardWrapper>

            </>
            ))
            }
        </>
    )
}

const CardWrapper = styled.section`
align-items: center;
display: flex;
flex-direction: column;
flex-wrap: wrap;
margin-bottom: 10px;
max-width: 350px;
min-width: 320px;
text-align: left;

&:before {
    content: url(${header});
    height: 100%;
    width: 100%;
}

&:after {
    content: url(${footer});
    height: 100%;
    width: 100%;
}
`
const InfoButton = styled.p`
color: var(--clr-accent1);
font-weight: var(--fw-bold);
margin: 0;

&:hover,
&:active {
    transform: scale(1.2);
    cursor: pointer;
}
`

const ContentWrapper = styled.div`
align-items: center;
background: #fff;
border-radius: 15px;
box-shadow: 2px 5px 10px rgba(0, 0, 0, .4);
display: flex;
flex-direction: column;
margin-bottom: -.6rem;
margin-top: -1.5rem;
max-width: 320px;
min-width: 320px;
padding: 1rem;
z-index: 10;

button {
    width: fit-content;
}

span {
    font-weight: var(--fw-bold);
}

header {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;

    img {
    border-radius: 15px;
    margin-right: .6rem;
    height: 40%;
    width: 40%;
}

}
`

RecipeCardSmall.propTypes = {
    likedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
}