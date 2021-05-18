import img from '../../assets/BackIcon.png'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function BackIcon({ isStatic }) {
    return (<IconWrapper isStatic={isStatic}></IconWrapper>)
}

const IconWrapper = styled.div`
content: url(${img});
position: ${({ isStatic }) => (isStatic ? 'static' : 'absolute')};
top: 5%;
left: 2rem;
cursor: pointer;
padding: 0;
z-index: 10;

@media screen and (min-width: 1024px) {
    display: none;
}
`

BackIcon.propTypes = {
    /** changes position of BackIcon from absolute to static on the Styleguidist-server so it gets rendered properly */
    isStatic: PropTypes.bool,
}
