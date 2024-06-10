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
        "fileSaved": contentWork.fileSaved,
        "fileName": contentWork.fileName,
        "histories": contentWork.histories
    })
}
const getAllContentWorkByIdProjectContentApi = async (idProjectContent) => {
    const response = await axios.get(`${domain}/api/ContentWork/GetAllByIdProjectContent?idProjectContent=${idProjectContent}`)
    return response
}
const getAllProjectContentByIdProjectApi = async (idProject) => {
    const response = await axios.get(`${domain}/api/ProjectContent/GetAllByIdProject?idProject=${idProject}`)
    return response
}
const getProjectContentByIdProjectContentApi = async (idProjectContent) => {
    const response = await axios.get(`${domain}/api/ProjectContent/${idProjectContent}`)
    return response
}
const getProjectByIdProjectApi = async (idProject) => {
    const response = await axios.get(`${domain}/api/Project/${idProject}`)
    return response
}
//Lấy các project có nv đó tham gia api/Project/GetAllProjectByIdEmployee?idEmployee=nv010
const getAllProjectEmployeeApi = async (idEmployee) => {
    const response = await axios.get(`${domain}/api/Project/GetAllProjectByIdEmployee?idEmployee=${idEmployee}`)
    return response
}
//cập nhật status projectContent
const updateProjectContentApi = async (idProjectContent, projectContent) => {
    await axios.put(`${domain}/api/ProjectContent/${idProjectContent}`, {
        "idProject": projectContent.idProject,
        "nameContent": projectContent.nameContent,
        "results": projectContent.results,
        "startDate": projectContent.startDate,
        "endDate": projectContent.endDate,
        "contractNo": projectContent.contractNo,
        "status": projectContent.status,
        "priority": projectContent.priority,
        "title": 0
    })
}
//cập nhật status Project
const updateProjectApi = async (idProject, project) => {
    await axios.put(`${domain}/api/Project/${idProject}`, {
        "idEmployee": project.idEmployee,
        "idPartner": project.idPartner,
        "projectName": project.projectName,
        "results": project.results,
        "startDateProject": project.startDateProject,
        "endDateProject": project.endDateProject,
        "contractNo": project.contractNo,
        "description": project.description,
        "fileProject": project.fileProject,
        "fileName": project.fileName,
        "status": project.status
    })
}

export {
    getAllContentWorkApi, updateContentWorkApi, getContentWorkApi, getProjectContentApi, getProjecttApi,
    getAllProjectEmployeeApi,

    getAllContentWorkByIdProjectContentApi,
    getAllProjectContentByIdProjectApi,
    getProjectContentByIdProjectContentApi,
    getProjectByIdProjectApi,

    updateProjectContentApi,
    updateProjectApi,
}
