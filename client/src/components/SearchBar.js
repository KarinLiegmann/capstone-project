import { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'


export default function SearchBar({ placeholderText }) {

    const [searchQuery, setSearchQuery] = useState('')
    const [isError, setIsError] = useState(false)
    const [autocompleteOptions, setAutocompleteOptions] = useState([])
    const [ingredient, setIngredient] = useState('')

    const getValue = event => setSearchQuery(event.target.value)


    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.length >= 3 && searchQuery.PropTypes === 'string') {
            setIngredient(searchQuery)
            setSearchQuery('')
        } else {
            setIsError(true)
        }
    }

    const getAutofillIngredients = async () => {
        const value = searchQuery
        try {
            const searchResults =
                await axios.get(`http://localhost:4000/ingredients`, {
                    params: {
                        number: 2,
                        query: value
                    },
                })
            const ingredientNames = searchResults.data.map(item => item.name)
            setAutocompleteOptions(ingredientNames)
            console.log(autocompleteOptions)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        if (searchQuery.length >= 5) {
            getAutofillIngredients();
        }
    }, [searchQuery])



    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <StyledSearchBar
                    name="searchBar"
                    placeholder={placeholderText}
                    onChange={getValue}
                    value={searchQuery}
                />
                <ul>
                    {autocompleteOptions.map(item => <li>{item}</li>)}
                </ul>


            </StyledForm>
            {isError &&
                <ErrorMessage>Ingredients must have at least 3 characters and musn't contain numbers!</ErrorMessage>
            }
        </>
    )
}

const StyledForm = styled.form`
display: flex;
flex-direction: column;

li {
    list-style: none;
}
`

const StyledSearchBar = styled.input`
border: 1px solid var(--clr-dark);
border-radius: 10px;
padding: .5rem;
width: 100%;
`

const ErrorMessage = styled.p`
color: var(--clr-accent2);
`



SearchBar.propTypes = {
    placeholderText: PropTypes.string.isRequired,
}