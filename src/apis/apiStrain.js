import axios from "axios";
import domain from "./domain";

const getAllStrainApi = (search, sortBy, page) => {
    return axios.get(`${domain}/api/Strain`, {search, sortBy, page});
};

const getAllStrainNoPagingApi = () => {
    return axios.get(`${domain}/api/Strain/NoPaging`);
};

export {
    getAllStrainApi,
    getAllStrainNoPagingApi
};
