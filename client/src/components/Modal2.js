import styled from 'styled-components'
import { ButtonMain } from './Buttons'

export default function Modal2({ onHideModal, onShowModal, show, recipe, openModal, onHandleClose, children }) {


    return (
        <>
            {<ModalDiv
                recipe={recipe}>
                <ContentDiv>
                    <h2>{recipe.title}</h2>
                    {children}

                    <ButtonMain
                        isActive
                        text="Close"
                        onHandleClick={onHandleClose} />
                </ContentDiv>
            </ModalDiv>
            }
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