import axios from "axios";
import domain from "./domain";

const getAllNewsPaperApi = async () => {
    const response = await axios.get(`${domain}/api/ScienceNewspaper`)
    return response
}
const getNewsPaperByIdApi = async (idNewsPaper) => {
    const response = await axios.get(`${domain}/api/ScienceNewspaper/${idNewsPaper}`)
    return response
}
const getGetRandomNewsPaperApi = async () => {
    const response = await axios.get(`${domain}/api/ScienceNewspaper/GetRandom`)
    return response
}

export {
    getAllNewsPaperApi,
    getNewsPaperByIdApi,
    getGetRandomNewsPaperApi,
}
