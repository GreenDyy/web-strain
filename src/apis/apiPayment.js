// https://localhost:7168/api/Inventory/GetByIdStrain/1
import axios from "axios";
import domain from "./domain";

const createOrderApi = async (idCustomer, totalPrice, note, deliveryAddress) => {
    const currentDate = new Date().toISOString().slice(0, 10);  //2011-10-05T14:48:00.000Z dạng vậy
    const response = await axios.post(`${domain}/api/Order`, {
        "idCustomer": idCustomer,
        "idEmployee": null,
        "dateOrder": currentDate,
        "totalPrice": totalPrice,
        "status": "Đang chờ xử lý",
        "note": note,
        "deliveryAddress": deliveryAddress
    });
    return response;
}

const addOrderDetailApi = async (idOrder, idStrain, quantity, price) => {
    const response = await axios.post(`${domain}/api/OrderDetail`, {
        "idOrder": idOrder,
        "idStrain": idStrain,
        "quantity": quantity,
        "price": price,
    })
    return response
}

const getAllOrderByIdCustomerApi = async (idCustomer) => {
    const response = await axios.get(`${domain}/api/Order/GetAllByIdCustomer/${idCustomer}`)
    return response
}

const getAllOrderDetailByIdOrderApi = async (idOrder) => {
    const response = await axios.get(`${domain}/api/OrderDetail/GetAllByIdOrder/${idOrder}`)
    return response
}

const getOrderByIdOrderApi = async (idOrder) => {
    const response = await axios.get(`${domain}/api/Order/${idOrder}`)
    return response
}

const sendMailOrderApi = async (idOrder) => {
    const response = await axios.post(`${domain}/api/Order/SendMailOrder?idOrder=${idOrder}`)
    return response
}

const deleteOrderDetail = async (idOrderDetail) => {
    await axios.delete(`${domain}/api/OrderDetail/${idOrderDetail}`)
}

const deleteOrder = async (idOrder) => {
    await axios.delete(`${domain}/api/Order/${idOrder}`)
}

export {
    createOrderApi,
    addOrderDetailApi,
    getAllOrderByIdCustomerApi,
    getAllOrderDetailByIdOrderApi,
    getOrderByIdOrderApi,
    sendMailOrderApi,
    deleteOrderDetail,
    deleteOrder,
};
