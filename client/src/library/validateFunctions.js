export const isNewEntry = (array, itemToCompare) => {
    const identicalItem = array.some(item => item.id === itemToCompare.id)
    if (identicalItem) {
        return false
    } else {
        return itemToCompare
    }
}

export const isValidId = (itemToValidate) => (itemToValidate.id)

