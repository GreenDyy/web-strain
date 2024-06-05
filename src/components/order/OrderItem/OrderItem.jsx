import React, { useState, useEffect } from "react";
import './OrderItem.scss'
import { convertImageByte, formatCurrency } from "../../../utils/Utils";
import { getInventoryByIdStrainApi } from "../../../apis/apiInventory";
import { getAllOrderDetailByIdOrderApi } from "../../../apis/apiPayment";
import { getStrainByIdApi } from "../../../apis/apiStrain";
import { GiTakeMyMoney } from "react-icons/gi";
import { images } from "../../../constants";
import { toastWarning } from "../../Toast/Toast";
import { DaHoanThanh, DangChoXuLy, DangDuocXuLy, DangVanChuyen } from "../../statusOrder/StatusOrder";

const ItemOrderDetail = ({ oderDetail }) => {
    const [price, setPrice] = useState(0)
    const [strain, setStrain] = useState(null)

    useEffect(() => {
        const fetchInventory = async () => {
            const inventory = await getInventoryByIdStrainApi(oderDetail.idStrain)
            const strain = await getStrainByIdApi(oderDetail.idStrain)
            setPrice(inventory.data.price)
            setStrain(strain.data)
        };
        fetchInventory();
    }, [oderDetail.idStrain]);
    const imgSrc = strain?.imageStrain ? convertImageByte(strain?.imageStrain) : images.strainnull

    return (
        <div className="card-product">
            <div className="item-col-1">
                <img className="img-item" src={imgSrc} />
                <div className="wrap-content">
                    <p className="name">{strain?.scientificName}</p>
                    <p className="price">{formatCurrency(price)} VNĐ</p>
                </div>
            </div>
            <div className="item-col-2">
                <p>x {oderDetail?.quantity}</p>
            </div>
        </div>
    )
}

function OrderItem({ order, onClick, onHandleDestroyOrder }) {
    const [listOrderDetail, setListOrderDetail] = useState([])

    useEffect(() => {
        const fetchDataOrderDetail = async () => {
            const dataOrder = await getAllOrderDetailByIdOrderApi(order.idOrder)
            setListOrderDetail(dataOrder.data)
        }
        fetchDataOrderDetail()
    }, [])

    return (
        <div className="OrderItem">
            <div className="row-1">
                <p className="id-order">Mã đơn hàng: #DH{order?.idOrder}</p>
                <div className="wrap-date-state">
                    <p className="date">{order?.dateOrder}</p>
                    <div className="state-order">
                        {order?.status === 'Đang chờ xử lý' && <DangChoXuLy />}
                        {order?.status === 'Đang được xử lý' && <DangDuocXuLy />}
                        {order?.status === 'Đang vận chuyển' && <DangVanChuyen />}
                        {order?.status === 'Đã hoàn thành' && <DaHoanThanh />}
                    </div>
                </div>
            </div>

            <div className="row-2" onClick={() => onClick()}>
                {listOrderDetail?.map((item, index) =>
                    <ItemOrderDetail key={index} oderDetail={item} />
                )}
            </div>

            <div className="total-money">
                <GiTakeMyMoney className="icon-money" />
                <p className="title-money">Thành tiền: </p>
                <h3 className="money">{formatCurrency(order?.totalPrice)} VNĐ</h3>
            </div>

            {order?.status === 'Đang chờ xử lý'
                &&
                <button className="btn-cancel" onClick={() => onHandleDestroyOrder(order.idOrder)}>Huỷ đơn hàng</button>
            }

        </div>
    )
}

export default OrderItem