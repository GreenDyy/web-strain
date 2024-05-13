import axios from "axios"
import domain from "./domain"

const getCartByIdCustomerApi = (idCustomer) => {
    const response = axios.get(`${domain}/api/Cart/GetByIdCustomer?idCustomer=${idCustomer}`)
    return response
}

const getAllDetailCartApi = (idCart) => {
    const response = axios.get(`${domain}/api/CartDetail/GetAllDetailCart?IdCart=${idCart}`)
    return response
}

const updateTotalProductApi = (idCart, totalProduct) => {
    axios.put(`${domain}/api/Cart/${idCart}`, totalProduct)
}

const updateDetailCartApi = (idCartDetail, modelCartDetail) => {
    axios.put(`${domain}/api/CartDetail/${idCartDetail}`, modelCartDetail)
}

const addDetailCartApi = (idCart, idStrain, quantityOfStrain) =>{
    const response = axios.post(`${domain}/api/CartDetail`, {
        "idCart": idCart,
        "idStrain": idStrain,
        "quantityOfStrain": quantityOfStrain
      })
    return response  
}
const removeDetailCartApi = (idCartDetail) => {
    axios.delete(`${domain}/api/CartDetail/${idCartDetail}`)
}

export {
    getCartByIdCustomerApi,
    getAllDetailCartApi,
    updateTotalProductApi,
    updateDetailCartApi,
    addDetailCartApi,
    removeDetailCartApi,
}   