import { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'


export default function SearchBar({ placeholderText, onCreateIngredient }) {

    const [searchQuery, setSearchQuery] = useState('')
    const [fetchedIngredients, setFetchedIngredients] = useState([])
    const [ingredient, setIngredient] = useState({})
    const [isError, setIsError] = useState(false)

    const getQueryValue = (event) => {
        const value = event.target.value
        const query = value.toLowerCase()
        setSearchQuery(query)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.length >= 3 && ingredient.length !== 0 && isError !== true) {
            onCreateIngredient(ingredient)
            setIngredient({})
            setSearchQuery('')
        } else {
            setIsError(true)
            setIngredient({})
        }

        if (fetchedIngredients.length !== 0 && fetchedIngredients[0].name === searchQuery) {
            onCreateIngredient(fetchedIngredients[0])
            setSearchQuery('')
        }
    }

    const getAutofillIngredients = async () => {
        const value = searchQuery
        try {
            const searchResults =
                await axios.get('/ingredients', {
                    params: {
                        metaInformation: true,
                        number: 2,
                        query: value
                    },
                })
            const ingredientsData = searchResults.data.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name,
            }))
            if (ingredientsData.length === 0) {
                setIsError(true);
                setIngredient({})
            }
            setFetchedIngredients(ingredientsData)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        if (searchQuery.length >= 3) {
            getAutofillIngredients();
        } else if (searchQuery.length === 0) {
            setFetchedIngredients([])
            setIsError(false)
        }
    }, [searchQuery])

    const getAutofillValue = (idToFind) => {
        fetchedIngredients.map((item) => {
            if (item.id === idToFind) {
                const ingredientToReplace = item.name
                setFetchedIngredients([])
                setSearchQuery(ingredientToReplace)
                setIngredient(item)
                setIsError(false)
            }
        })
    }

    return (
        <>
            <FormWrapper>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledSearchBar
                        autoComplete="off"
                        name="SearchBar"
                        placeholder={placeholderText}
                        onChange={getQueryValue}
                        value={searchQuery}
                    />
                    {fetchedIngredients.length >= 1 &&
                        <ul>
                            {fetchedIngredients.map(item =>
                                <li
                                    key={item.id}
                                    name={item.name}
                                    onClick={() => getAutofillValue(item.id)}>
                                    {item.name}
                                </li>)}
                        </ul>
                    }

                </StyledForm>
                <AddButton
                    onClick={handleSubmit}>
                    &#43;
            </AddButton>


            </FormWrapper>
            {isError &&
                <ErrorMessage>Sorry, no matching results...</ErrorMessage>
            }
        </>
    )
}

const FormWrapper = styled.div`
border: 1px solid var(--clr-dark);
border-radius: 10px;
box-shadow: var(--bs-dark);
display: flex;
align-items: center;
width: 100%;
`

const AddButton = styled.span`
color: var(--clr-accent1);
font-size: var(--fs-h2);
font-weight: var(--fw-black);
align-self: flex-start;

&:focus,
&:hover {
    transform: scale(1.3);
}
`

const StyledForm = styled.form`
align-items: center;
display: flex;
flex-direction: column;
width: 90%;

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
        font-weight: var(--fw-bold);
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
    onCreateIngredient: PropTypes.func.isRequired
}