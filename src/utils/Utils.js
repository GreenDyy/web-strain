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
    const formattedNumber = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumber;
}

const convertImageByte = (imageByte) => {
    return `data:image/jpeg;base64,${imageByte}`
}

const convertImageToVarBinary = (imageUrl) => {
    return new Promise((resolve, reject) => {
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result.split(',')[1];
                    resolve(base64String);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            })
            .catch(error => reject(error));
    });
};

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
function base64ToBlob(base64, type) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
}
export {
    getDataLocalStorage,
    setDataLocalStorage,
    removeDataLocalStorage,
    formatCurrency,
    convertImageByte,
    validateEmail,
    convertImageToVarBinary,
    base64ToBlob,
}