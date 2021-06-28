import styled from 'styled-components'
import IngredientsList from '../Ingredients/IngredientsList'


export default function Modal({ recipeData, openModal, onCloseModal, isStatic }) {

    return (
        <>
            {openModal && <ModalDiv
                openModal={openModal}
                recipeData={recipeData}
                isStatic={isStatic}
            >
                {!recipeData.isFavourite &&
                    <ContentDiv
                        isStatic={isStatic}>
                        <span onClick={onCloseModal}>X</span>
                        <h2>{recipeData.title}</h2>
                        <h3>Missing Ingredients:</h3>
                        <ul>
                            <IngredientsList ingredients={recipeData.missedIngredients} />
                        </ul>

                        <h3>Used Ingredients:</h3>
                        <ul>
                            <IngredientsList ingredients={recipeData.usedIngredients} />
                        </ul>
                    </ContentDiv>}

                {recipeData.isFavourite &&
                    <ContentDiv>
                        <span onClick={onCloseModal}>X</span>
                        <h2>{recipeData.title}</h2>
                        <h3>Needed Ingredients:</h3>
                        <ul>
                            <IngredientsList ingredients={recipeData.missedIngredients} />
                            <IngredientsList ingredients={recipeData.usedIngredients} />
                        </ul>
                    </ContentDiv>}

            </ModalDiv>}
        </>
    )
}

const ModalDiv = styled.div`
display: ${p => p.openModal && p.openModal};
position: ${({ isStatic }) => (isStatic ? 'static' : 'fixed')};
top: 0;
left: 0;
height: 100%;
width: 100%;
z-index: 100;
`

const ContentDiv = styled.div`
display: flex;
flex-direction: column;
backdrop-filter: blur(7px);
background: rgb(252, 250, 248, .9);
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 1rem;
cursor: pointer;
overflow: scroll;
height: auto;
max-height: 80vmax;
width: 80%;
top: 35%;
left: 50%;
padding: 1rem;
position: ${({ isStatic }) => (isStatic ? 'static' : 'fixed')};
text-align: left;
transform: ${({ isStatic }) => (isStatic ? '0' : 'translate(-50%, -30%)')};

h2 {
    margin: 0;
    margin-bottom: 1rem;
}

span {
    color: var(--clr-accent1);
    font-size: var(--fs-h2);
    font-weight: var(--fw-bold);
    align-self: flex-end;

    &:hover,
    &:active {
    transform: scale(1.2);
  }  
}
`