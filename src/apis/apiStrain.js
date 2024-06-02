import axios from "axios";
import domain from "./domain";

const getAllStrainApi = async (search, sortBy, page) => {
    return await axios.get(`${domain}/api/Strain?search=${search}&sortBy=${sortBy}&page=${page}`);
};

const getAllStrainNoPagingApi = async () => {
    return await axios.get(`${domain}/api/Strain/NoPaging`);
};

const getRandomStrainApi = async () => {
    return await axios.get(`${domain}/api/Strain/GetRandom`);
};

const getAllStrainByNumberAndNameApi = async (search) => {
    return await axios.get(`${domain}/api/Strain/GetAllByStraiNumberAndScientificName?search=${search}`);
};

const getAllStrainByTheEmployee = async (idEmployy) => {
    return await axios.get(`${domain}/api/Strain/GetAllStrainByTheEmployee?idEmployee=${idEmployy}`);
}

// Follow TYPE
const getAllStrainFollowPhylumApi = async (namePhylum, search, sortBy, page) => {
    return await axios.get(`${domain}/api/Strain/FollowPhylum?namePhylum=${namePhylum}&search=${search}&sortBy=${sortBy}&page=${page}`);
};

const getAllStrainFollowClassApi = async (nameClass, search, sortBy, page) => {
    return await axios.get(`${domain}/api/Strain/FollowClass?nameClass=${nameClass}&search=${search}&sortBy=${sortBy}&page=${page}`);
};

const getAllStrainFollowGenusApi = async (nameGenus, search, sortBy, page) => {
    return await axios.get(`${domain}/api/Strain/FollowGenus?nameGenus=${nameGenus}&search=${search}&sortBy=${sortBy}&page=${page}`);
};

const getAllStrainFollowSpeciesApi = async (nameSpecies, search, sortBy, page) => {
    return await axios.get(`${domain}/api/Strain/FollowSpecies?nameSpecies=${nameSpecies}&search=${search}&sortBy=${sortBy}&page=${page}`);
};

const getStrainByIdApi = async (id) => {
    return await axios.get(`${domain}/api/Strain/${id}`);
};

// Class
const getClassByIdApi = async (id) => {
    return await axios.get(`${domain}/api/Class/${id}`);
};

const getAllClassApi = async () => {
    return await axios.get(`${domain}/api/Class`);
};

// Phylum
const getPhylumByIdApi = async (id) => {
    return await axios.get(`${domain}/api/Phylum/${id}`);
};

const getAllPhylumApi = async () => {
    return await axios.get(`${domain}/api/Phylum`);
};

// Species
const getSpeciesByIdApi = async (id) => {
    return await axios.get(`${domain}/api/Species/${id}`);
};

const getAllSpeciesApi = async () => {
    return await axios.get(`${domain}/api/Species`);
};

// Genus
const getGenusByIdApi = async (id) => {
    return await axios.get(`${domain}/api/Genus/${id}`);
};

const getAllGenusApi = async () => {
    return await axios.get(`${domain}/api/Genus`);
};

// Condition
const getConditionByIdApi = async (id) => {
    return await axios.get(`${domain}/api/ConditionalStrain/${id}`);
};

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
    getAllStrainByNumberAndNameApi,
    getAllStrainByTheEmployee,
};
