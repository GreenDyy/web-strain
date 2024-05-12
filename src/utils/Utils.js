const getDataLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    if (data) {
        return JSON.parse(data)
    }
    return null
}

const setDataLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const removeDataLocalStorage = (key) => {
    localStorage.removeItem(key)
}

const formatCurrency = (number) => {
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumber;
}

export {
    getDataLocalStorage,
    setDataLocalStorage,
    removeDataLocalStorage,
    formatCurrency,
}