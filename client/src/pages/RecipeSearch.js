import styled from 'styled-components'


import Button from '../components/Button'
import SearchBar from '../components/SearchBar'


export default function RecipeSearch() {

    return (
        <Wrapper>
            <h2>Hi, what's in your fridge today?</h2>
            <SearchBar
                placeholderText="Search and add ingredient..."
            />
            <Button
                text="Find Recipes" />
        </Wrapper>
    )
}

const Wrapper = styled.section`
Button {
   align-self: flex-end;
    width: fit-content;
}
`