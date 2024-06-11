import axios from "axios"
import domain from "./domain"

const loginEmployeeApi = async (username, password) => {
    const response = await axios.post(`${domain}/api/Employee/Login`, { username, password })
    return response
}
const getEmployeeByIdApi = async (idEmployee) => {
    const response = await axios.get(`${domain}/api/Employee/${idEmployee}`)
    return response
}

const updateEmployeeApi = async (idEmployee, employee) => {
    await axios.put(`${domain}/api/Employee/${idEmployee}`, {
        "idRole": employee.idRole,
        "firstName": employee.firstName,
        "lastName": employee.lastName,
        "fullName": employee.fullName,
        "idCard": employee.idCard,
        "dateOfBirth": employee.dateOfBirth,
        "gender": employee.gender,
        "email": employee.email,
        "phoneNumber": employee.phoneNumber,
        "degree": employee.degree,
        "address": employee.address,
        "joinDate": employee.joinDate,
        "imageEmployee": employee.imageEmployee,
        "nameWard": employee.nameWard,
        "nameDistrict": employee.nameDistrict,
        "nameProvince": employee.nameProvince,
        "username": employee.username,
        "password": employee.password,
        "status": employee.status
    })
}

export {
    loginEmployeeApi,
    getEmployeeByIdApi,
    updateEmployeeApi,
}   