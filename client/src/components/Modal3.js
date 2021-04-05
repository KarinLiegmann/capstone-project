import styled from 'styled-components'


export default function Modal3({ recipeData, openModal, onCloseModal }) {


    return (
        <>{openModal && <ModalDiv
            openModal={openModal}
            recipeData={recipeData}
        >
            <ContentDiv>
                <span onClick={onCloseModal}>X</span>
                <h3>{recipeData.title}</h3>


            </ContentDiv>

        </ModalDiv>}

        </>
    )
}

const ModalDiv = styled.div`
display: ${p => p.openModal && p.openModal};
position: fixed;
top: 0;
left: 0;
height: 100%;
width: 100%;
`

const ContentDiv = styled.div`
display: flex;
flex-direction: column;
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

span {
    color: var(--clr-accent1);
    font-size: var(--fs-h2);
    font-weight: var(--fw-bold);
    align-self: flex-end;
}
`