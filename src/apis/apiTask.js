import axios from "axios"
import domain from "./domain"

const getAllContentWorkApi = async (idEmployee) => {
    const response = await axios.get(`${domain}/api/ContentWork/GetAllByIdEmployee?idEmployee=${idEmployee}`)
    return response
}
const getContentWorkApi = async (idContentWork) => {
    const response = await axios.get(`${domain}/api/ContentWork/${idContentWork}`)
    return response
}

const updateContentWorkApi = async (idContentWork, contentWork) => {
    await axios.put(`${domain}/api/ContentWork/${idContentWork}`, {
        "idProjectContent": contentWork.idProjectContent,
        "idEmployee": contentWork.idEmployee,
        "nameContent": contentWork.nameContent,
        "results": contentWork.results,
        "startDate": contentWork.startDate,
        "endDate": contentWork.endDate,
        "contractNo": contentWork.contractNo,
        "status": contentWork.status,
        "priority": contentWork.priority,
        "endDateActual": contentWork.endDateActual,
        "notificattion": contentWork.notificattion,
        "title": contentWork.title,
        "subTitle": contentWork.subTitle,
        "fileSaved": contentWork.fileName,
        "fileName": contentWork.fileName,
        "histories": contentWork.histories
    })
}



export {
    getAllContentWorkApi, updateContentWorkApi, getContentWorkApi,

}
