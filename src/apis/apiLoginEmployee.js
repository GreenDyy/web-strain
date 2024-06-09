import axios from "axios"
import domain from "./domain"

const loginEmployeeApi = async (username, password) => {
    const response = await axios.post(`${domain}/api/Employee/Login`, { username, password })
    return response
}


export {
    loginEmployeeApi,
}   