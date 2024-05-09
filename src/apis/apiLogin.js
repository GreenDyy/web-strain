import axios from "axios"
import domain from "./domain"

const loginCustomerApi = (username, password) => {
    const response = axios.post(`${domain}/api/Customer/Login`, { username, password })
    return response
}

const getAllCustomer = () => {
    const response = axios.get(`${domain}/api/Customer`)
    return response
}

export {
    loginCustomerApi,
    getAllCustomer
}   