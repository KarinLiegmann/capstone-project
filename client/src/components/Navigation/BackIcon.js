import img from '../../assets/BackIcon.png'
import styled from 'styled-components'

export default function BackIcon() {
    return (<IconWrapper></IconWrapper>)
}

const IconWrapper = styled.div`
content: url(${img});
position: absolute;
top: 5%;
left: 2rem;
cursor: pointer;
padding: 0;
z-index: 10;

@media screen and (min-width: 1024px) {
    display: none;
}
`