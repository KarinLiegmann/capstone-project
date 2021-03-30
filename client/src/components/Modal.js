import styled from 'styled-components'

export default function Modal({ handleClose, show, children, recipe }) {
    return (
        <ModalDiv block={show ? 'block' : 'none'}>
            <ContentDiv
                recipe={recipe}
            >
                <h3>Missing Ingredients:</h3>
                <ul>
                    {recipe.missedIngredients && recipe.missedIngredients.map((missedIngredient) => (
                        <li key={missedIngredient.id}>{missedIngredient.amount} {missedIngredient.unitShort} {missedIngredient.name.toLowerCase()}</li>
                    ))}
                    <h3>Used Ingredients:</h3>
                    <ul>
                        {recipe.usedIngredients && recipe.usedIngredients.map((usedIngredient) => (
                            <li key={usedIngredient.id}>{usedIngredient.amount} {usedIngredient.unitShort} {usedIngredient.name.toLowerCase()}</li>
                        ))}
                    </ul>
                </ul>
                {children}
                <button
                    onClick={handleClose}>
                    Close
                    </button>
            </ContentDiv>
        </ModalDiv>
    )
}

const ModalDiv = styled.div`
display: ${p => p.block && p.block};
position: fixed;
top: 0;
left: 0;
height: 100%;
width: 100%;
`

const ContentDiv = styled.div`
position: fixed;
backdrop-filter: blur(7px);
background: rgb(252, 250, 248, .8);
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 1rem;
cursor: pointer;
width: 80%;
height: auto;
top: 35%;
left: 50%;
padding: 1rem;
transform: translate(-50%, -30%);
`