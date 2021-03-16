import axios from 'axios'

export async function getAutofillIngredients(searchQuery) {
    const value = searchQuery
    try {
        await axios.get(`http://localhost:4000/ingredients`, {
            params: {
                number: 2,
                query: value
            },
        })
            .then(response => {
                const autocompleteOptions = response.data
                let autocompleteNames = autocompleteOptions.map(ingredient => ingredient.name)
                console.log(autocompleteNames)
                return autocompleteNames
            })
    }
    catch (error) {
        console.error(error)
    }
}