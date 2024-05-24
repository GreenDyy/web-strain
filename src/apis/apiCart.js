import axios from "axios"
import domain from "./domain"

const getCartByIdCustomerApi = async (idCustomer) => {
    const response = await axios.get(`${domain}/api/Cart/GetByIdCustomer?idCustomer=${idCustomer}`)
    return response
}

const getAllDetailCartApi = async (idCart) => {
    const response = await axios.get(`${domain}/api/CartDetail/GetAllDetailCart?IdCart=${idCart}`)
    return response
}

const updateTotalProductApi = async (idCart, totalProduct) => {
    await axios.put(`${domain}/api/Cart/${idCart}`, totalProduct)
}

const updateDetailCartApi = async (idCartDetail, modelCartDetail) => {
    await axios.put(`${domain}/api/CartDetail/${idCartDetail}`, modelCartDetail)
}

const addDetailCartApi = async (idCart, idStrain, quantityOfStrain) => {
    const response = await axios.post(`${domain}/api/CartDetail`, {
        "idCart": idCart,
        "idStrain": idStrain,
        "quantityOfStrain": quantityOfStrain
    })
    return response
}
const removeDetailCartApi = async (idCartDetail) => {
    await axios.delete(`${domain}/api/CartDetail/${idCartDetail}`)
}

const getAllTotalQuantityApi = async (idCart) => {
    return await axios.get(`${domain}/api/CartDetail/GetAllTotalQuantity/${idCart}`)
}

export {
    getCartByIdCustomerApi,
    getAllDetailCartApi,
    updateTotalProductApi,
    updateDetailCartApi,
    addDetailCartApi,
    removeDetailCartApi,
    getAllTotalQuantityApi,
}   