import { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getAutofillIngredients } from '../services/getAutofillIngredients'

export default function SearchBar({ placeholderText }) {

    const [searchQuery, setSearchQuery] = useState('')
    const [isError, setIsError] = useState(false)
    const [ingredient, setIngredient] = useState('')

    const getValue = event => setSearchQuery(event.target.value)


    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.length >= 3) {
            setIngredient(searchQuery)
            setSearchQuery('')
        } else {
            setIsError(true)
        }
    }

    useEffect(() => {
        let value = searchQuery
        if (searchQuery.length >= 5) {
            getAutofillIngredients(value)
            console.log(value)
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
                <button>Add</button>

            </StyledForm>
            {isError &&
                <ErrorMessage>Ingredients must have at least 3 characters!</ErrorMessage>
            }
        </>
    )
}

const StyledForm = styled.form`
display: flex;
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