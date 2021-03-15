function saveToLocal(key, value) {
    return (localStorage.setItem(key, JSON.stringify(value)))
}

function loadFromLocal(key) {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (error) {
        return (error) => console.error(error.message)
    }
}

export { saveToLocal, loadFromLocal }
