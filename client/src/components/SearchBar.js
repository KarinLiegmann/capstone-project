import { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'


export default function SearchBar({ placeholderText }) {

    const [searchQuery, setSearchQuery] = useState([])
    const [isError, setIsError] = useState(false)
    const [autocompleteOptions, setAutocompleteOptions] = useState([])
    const [ingredient, setIngredient] = useState('')

    const getValue = (event) => setSearchQuery(event.target.value)

    console.log(searchQuery)

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
                        metaInformation: true,
                        number: 2,
                        query: value
                    },
                })
            const ingredients = searchResults.data.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name,
            }))
            console.log(ingredients)
            setAutocompleteOptions(ingredients)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        if (searchQuery.length === 5) {
            getAutofillIngredients();
        } else if (searchQuery.length === 0) {
            setAutocompleteOptions([])
        }
    }, [searchQuery])

    const getAutofillValue = (idToFind) => {
        const ingredientToReplace = autocompleteOptions.map((item) => {
            if (item.id === idToFind) {
                setSearchQuery(item.name)
                setAutocompleteOptions([])
            }
        })
    }

    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <StyledSearchBar
                    name="searchBar"
                    placeholder={placeholderText}
                    onChange={getValue}
                    value={searchQuery}
                />
                {autocompleteOptions.length > 0 &&
                    <ul>
                        {autocompleteOptions.map(item =>
                            <li
                                key={item.id}
                                name={item.name}
                                onClick={() => getAutofillValue(item.id)}>
                                {item.name}
                            </li>)}
                    </ul>
                }


            </StyledForm>
            {isError &&
                <ErrorMessage>Ingredients must have at least 3 characters and musn't contain numbers!</ErrorMessage>
            }
        </>
    )
}

const StyledForm = styled.form`
align-items: center;
border: 1px solid var(--clr-dark);
border-radius: 10px;
box-shadow: var(--bs-dark);
display: flex;
flex-direction: column;
width: 100%;

ul {
    border-top: 1px solid var(--clr-dark);    
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: .5rem;
    text-align: left;
    width: 100%;
}

li {
    cursor: pointer;
    font-size: var(--fs-body);
    padding-left: .5rem;

    &:focus,
    &:hover {
        color: var(--clr-accent1);
        text-decoration: underline;
        text-decoration-color: var(--clr-accent1);
    }    
}
`

const StyledSearchBar = styled.input`
border-style: none;
color: var(--clr-dark);
font-size: var(--fs-body);
padding: .5rem;
width: 95%;

&:focus {
    outline: none;
}
`

const ErrorMessage = styled.p`
color: var(--clr-accent2);
`



SearchBar.propTypes = {
    placeholderText: PropTypes.string.isRequired,
}