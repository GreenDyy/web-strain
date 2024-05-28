import axios from "axios"
import domain from "./domain"

const loginCustomerApi = async (username, password) => {
    const response = await axios.post(`${domain}/api/Customer/Login`, { username, password })
    return response
}

const getAllCustomerApi = async () => {
    const response = await axios.get(`${domain}/api/Customer`)
    return response
}

const registerCustomerApi = async (userModel) => {
    const response = await axios.post(`${domain}/api/Customer`, userModel)
    return response
}

const getCustomerApi = async (idCustomer) => {
    const response = await axios.get(`${domain}/api/Customer/${idCustomer}`)
    return response
}

const updateCustomerApi = async (idCustomer, userModel) => {
    await axios.put(`${domain}/api/Customer/${idCustomer}`, userModel)
}

const resetPasswordCustomerApi = async (email, newPass) => {
    await axios.put(`${domain}/api/Customer/reset-pass?email=${email}&newPass=${newPass}`, )
}

const checkExistEmailApi = async (email) => {
    const response = await axios.post(`${domain}/api/Customer/CheckExistEmail?email=${email}`)
    return response
}

const checkExistUserNameApi = async (userName) => {
    const response = await axios.post(`${domain}/api/Customer/CheckExistUsername?userName=${userName}`)
    return response
}

export {
    loginCustomerApi,
    getAllCustomerApi,
    registerCustomerApi,
    getCustomerApi,
    updateCustomerApi,
    resetPasswordCustomerApi,
    checkExistEmailApi,
    checkExistUserNameApi,
}   