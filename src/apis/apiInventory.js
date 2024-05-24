// https://localhost:7168/api/Inventory/GetByIdStrain/1
import axios from "axios";
import domain from "./domain";

const getInventoryByIdStrainApi = async (idStrain) => {
    return await axios.get(`${domain}/api/Inventory/GetByIdStrain/${idStrain}`);
};

const updateInventoryByIdStrainApi = async (idStrain, modelInventory) => {
    await axios.put(`${domain}/api/Inventory/IDStrain/${idStrain}`, modelInventory)
}

export {
    getInventoryByIdStrainApi,
    updateInventoryByIdStrainApi,
};
