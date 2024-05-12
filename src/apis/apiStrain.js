import axios from "axios";
import domain from "./domain";

const getAllStrainApi = (search, sortBy, page) => {
    return axios.get(`${domain}/api/Strain`, { search, sortBy, page });
};

const getAllStrainNoPagingApi = () => {
    return axios.get(`${domain}/api/Strain/NoPaging`);
};

const getStrainByIdApi = (id) => {
    const response = axios.get(`${domain}/api/Strain/${id}`)
    return response
}
//Class
const getClassByIdApi = (id) => {
    const response = axios.get(`${domain}/api/Class/${id}`)
    return response
}
//Phylum
const getPhylumByIdApi = (id) => {
    const response = axios.get(`${domain}/api/Phylum/${id}`)
    return response
}
//Species
const getSpeciesByIdApi = (id) => {
    const response = axios.get(`${domain}/api/Species/${id}`)
    return response
}
//Genus
const getGenusByIdApi = (id) => {
    const response = axios.get(`${domain}/api/Genus/${id}`)
    return response
}
//Condition
const getConditionByIdApi = (id) => {
    const response = axios.get(`${domain}/api/ConditionalStrain/${id}`)
    return response
}

export {
    getAllStrainApi,
    getAllStrainNoPagingApi,
    getStrainByIdApi,
    getClassByIdApi,
    getPhylumByIdApi,
    getSpeciesByIdApi,
    getGenusByIdApi,
    getConditionByIdApi,
};
