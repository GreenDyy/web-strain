import axios from "axios"
import domain from "./domain"

const getCartByIdCustomer = (idCustomer) => {
    const response = axios.get(`${domain}/api/Cart/GetByIdCustomer?idCustomer=${idCustomer}`)
    return response
}

const getAllDetailCart = (idCart) => {
    const response = axios.get(`${domain}/api/CartDetail/GetAllDetailCart?IdCart=${idCart}`)
    return response
}

const updateTotalProduct = (idCart, totalProduct) => {
    axios.put(`${domain}/api/Cart/${idCart}`, totalProduct)
}

const updateDetailCart = (idCartDetail, modelCartDetail) => {
    axios.put(`${domain}/api/CartDetail/${idCartDetail}`, modelCartDetail)
}

const addDetailCart = (idCart, idStrain, quantityOfStrain) =>{
    const response = axios.post(`${domain}/api/CartDetail`, {
        "idCart": idCart,
        "idStrain": idStrain,
        "quantityOfStrain": quantityOfStrain
      })
    return response  
}

export {
    getCartByIdCustomer,
    getAllDetailCart,
    updateTotalProduct,
    updateDetailCart,
    addDetailCart,
}   