import axios from "axios";
import domain from "./domain";

const getAllStrainApi = (search, sortBy, page) => {
    return axios.get(`${domain}/api/Strain?search=${search}&sortBy=${sortBy}&page=${page}`)
};

const getAllStrainNoPagingApi = () => {
    return axios.get(`${domain}/api/Strain/NoPaging`);
};

const getRandomStrainApi = () => {
    return axios.get(`${domain}/api/Strain/GetRandom`);
};

//follow TYPE
const getAllStrainFollowPhylumApi = (namePhylum, search, sortBy, page) => {
    return axios.get(`${domain}/api/Strain/FollowPhylum?namePhylum=${namePhylum}&search=${search}&sortBy=${sortBy}&page=${page}`)
}
const getAllStrainFollowClassApi = (nameClass, search, sortBy, page) => {
    return axios.get(`${domain}/api/Strain/FollowClass?nameClass=${nameClass}&search=${search}&sortBy=${sortBy}&page=${page}`)
}
const getAllStrainFollowGenusApi = (nameGenus, search, sortBy, page) => {
    return axios.get(`${domain}/api/Strain/FollowGenus?nameGenus=${nameGenus}&search=${search}&sortBy=${sortBy}&page=${page}`)
}
const getAllStrainFollowSpeciesApi = (nameSpecies, search, sortBy, page) => {
    return axios.get(`${domain}/api/Strain/FollowSpecies?nameSpecies=${nameSpecies}&search=${search}&sortBy=${sortBy}&page=${page}`)
}

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
    getAllStrainFollowPhylumApi,
    getAllStrainFollowClassApi,
    getAllStrainFollowGenusApi,
    getAllStrainFollowSpeciesApi,
    getRandomStrainApi,
};
