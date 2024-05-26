import React, { useState, useEffect } from "react";
import './Order.scss'
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem/OrderItem";
import { getAllOrderByIdCustomerApi } from "../../apis/apiPayment";
import { useNavigate } from "react-router-dom";

function Order() {
    const customerData = useSelector(state => state.customer.customerData)
    const [listOrder, setListOrder] = useState([])
    const [tab, setTab] = useState(1)
    const navigate = useNavigate()
    const tinhTrangs = ['Tất cả', 'Đang chờ xử lý', 'Đang được xử lý', 'Đang vận chuyển', 'Đã hoàn thành']

    useEffect(() => {
        const fetchDataOrder = async () => {
            const dataOrder = await getAllOrderByIdCustomerApi(customerData.idCustomer)
            setListOrder(dataOrder.data)
        }
        fetchDataOrder()
    }, [])

    return (
        <>
            {listOrder.length !== 0 ?
                <div className="Order">
                    <div className="wrap-state">
                        {tinhTrangs.map((tinhTrang, index) => (
                            <button className={`btn-state ${tab === index + 1 ? 'active' : ''}`} 
                            key={index}
                            onClick={()=>setTab(index+1)}
                            >{tinhTrang}</button>
                        ))}
                    </div>

                    <div className="wrap-order" >
                        {listOrder.map((item, index) => {
                            return (
                                <OrderItem key={index} order={item} onClick={() => navigate(`/OrderDetail/${item.idOrder}`)} />
                            )
                        })}
                    </div>
                </div>
                :
                <p>Chưa có đơn nào</p>
            }
        </>
    )
}

export default Order