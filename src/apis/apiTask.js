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

const getProjectContentApi = async (idProjectContent) => {
    const response = await axios.get(`${domain}/api/ProjectContent/${idProjectContent}`)
    return response
}

const getProjecttApi = async (idProject) => {
    const response = await axios.get(`${domain}/api/Project/${idProject}`)
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
//cập nhật status projectContent
const updateStatusProjectContentApi = async (idProjectContent, status) => {
    await axios.patch(`${domain}/api/ContentWork/${idProjectContent}/status`, {status})
}
//cập nhật status Project
const updateStatusProjectApi = async (idProject, status) => {
    await axios.patch(`${domain}/api/ProjectContent/${idProject}/status`, {status})
}


export {
    getAllContentWorkApi, updateContentWorkApi, getContentWorkApi, getProjectContentApi, getProjecttApi,
    updateStatusProjectContentApi,
    updateStatusProjectApi,
}
