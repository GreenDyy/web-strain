import axios from "axios"
import domain from "./domain"

const loginCustomerApi = (username, password) => {
    console.log(axios.post(`${domain}/api/Customer/Login`, { username, password }))
    return axios.post(`${domain}/api/Customer/Login`, { username, password })
}

const loginCustomerApi2 = (username, password) => {
    return axios.post(`${domain}/api/Customer/Login`, { username, password })
}

export {
    loginCustomerApi, 
    loginCustomerApi2
}