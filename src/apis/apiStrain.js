import axios from "axios";
import domain from "./domain";

const getAllStrainApi = (search, sortBy, page) => {
    return axios.get(`${domain}/api/Strain?search=${search}&sortBy=${sortBy}&page=${page}`)
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
const getAllClassApi = () => {
    const response = axios.get(`${domain}/api/Class`)
    return response
}

//Phylum
const getPhylumByIdApi = (id) => {
    const response = axios.get(`${domain}/api/Phylum/${id}`)

    return response
}
const getAllPhylumApi = () => {
    const response = axios.get(`${domain}/api/Phylum`)
    return response
}
//Species
const getSpeciesByIdApi = (id) => {
    const response = axios.get(`${domain}/api/Species/${id}`)
    return response
}
const getAllSpeciesApi = () => {
    const response = axios.get(`${domain}/api/Species`)
    return response
}
//Genus
const getGenusByIdApi = (id) => {
    const response = axios.get(`${domain}/api/Genus/${id}`)
    return response
}
const getAllGenusApi = () => {
    const response = axios.get(`${domain}/api/Genus`)
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
    getAllClassApi,
    getAllGenusApi,
    getAllPhylumApi,
    getAllSpeciesApi,
};
