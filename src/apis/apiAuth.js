import axios from "axios"
import domain from "./domain"

const sendOtpApi = async (email) => {
    const response = await axios.post(`${domain}/api/Auth/send-otp?toEmail=${email}`)
    return response
}

const verifyOtpApi = async (email, otp) => {
    const response = await axios.post(`${domain}/api/Auth/verify-otp?email=${email}&otp=${otp}`)
    return response
}

export {
    sendOtpApi,
    verifyOtpApi,
}
