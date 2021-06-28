import styled from 'styled-components'
import PropTypes from 'prop-types'
import header from '../../assets/CardSmallHeader.png'
import footer from '../../assets/CardSmallFooter.png'
import { RiDeleteBinLine } from 'react-icons/ri'

import { ButtonSecondary } from '../Navigation/Buttons'
import { MissingIngredients, UsedIngredients } from '../Ingredients/IngredientsListShort'

export default function RecipeCardSmall({ onDeleteFavourite, onShowRecipePage, onOpenModal, recipes }) {


    return (
        <>
            {recipes && recipes.map((recipe) =>
            (<>
                <CardWrapper
                    key={recipe.id}>
                    <ContentWrapper>
                        <header>
                            <img src={recipe.image} alt={recipe.title} />
                            <h3>{recipe.title}</h3>
                        </header>

                        <ButtonSecondary
                            text="Cook Me"
                            isActive
                            onHandleClick={() => onShowRecipePage(recipe)}
                        />

                        {!recipe.isFavourite && recipe.missedIngredients.length &&
                            <p><MissingIngredients recipe={recipe} /></p>
                        }

                        {recipe.isFavourite &&
                            <>
                                <DeleteIcon onClick={() => onDeleteFavourite(recipe.id)} />
                                <p><MissingIngredients recipe={recipe} />, <UsedIngredients recipe={recipe} />
                                </p>
                            </>
                        }

                        <InfoButton onClick={() => onOpenModal(recipe)}>
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

    h3 {
        margin-top: 0;
    }

}
`

const DeleteIcon = styled(RiDeleteBinLine)`
color: var(--clr-dark);
font-size: 2.7rem;
margin-top: 2rem;

&:hover,
&:active {
    transform: scale(1.2);
    color: var(--clr-accent2);
    cursor: pointer;
}`


RecipeCardSmall.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** shows the recipe instruction-page by clicking on the 'Cook Me'-Button */
    onShowRecipePage: PropTypes.func.isRequired,
    /** function only works when recipe is a favourite recipe. removes the card from favourite recipes. */
    onDeleteFavourite: PropTypes.func,
    /** opens the modal with details about the ingredients */
    onOpenModal: PropTypes.func.isRequired
}