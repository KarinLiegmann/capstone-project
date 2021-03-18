export const isValidSearchQuery = (query) => {
    const value = /^[a-zA-Z_]*$/;
    if (query.match(value) && query.length >= 3) {
        console.log('query is validated')
        return true
    } else {
        console.log('query does not match validation')
        return false
    }
}


const isValidQuery = (query) =>
    isValidSearchQuery(query)

export default isValidQuery