import React, { useEffect, useState } from "react";
import './OrderDetail.scss'
import { useNavigate, useParams } from "react-router-dom";
import { getAllOrderDetailByIdOrderApi, getOrderByIdOrderApi } from "../../../apis/apiPayment";
import { getInventoryByIdStrainApi } from "../../../apis/apiInventory";
import { getStrainByIdApi } from "../../../apis/apiStrain";
import { convertImageByte, formatCurrency } from "../../../utils/Utils";
import { images } from "../../../constants";
import { FaCheck } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { DaHoanThanh, DangChoXuLy, DangDuocXuLy, DangVanChuyen } from "../../statusOrder/StatusOrder";
import { useSelector } from "react-redux";

const ItemOrderDetail = ({ oderDetail }) => {
    const [price, setPrice] = useState(0)
    const [strain, setStrain] = useState(null)
    const navigate = useNavigate()

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
    console.log('ItemOrderDetail', oderDetail)
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
                <p>x {oderDetail.quantity}</p>
            </div>
        </div>
    )
}

function OrderDetail() {
    const { idOrder } = useParams()
    const customerData = useSelector(state => state.customer.customerData)
    const [dataOrder, setDataOrder] = useState(null);
    const [listOrderDetail, setListOrderDetail] = useState([])
    const steps = ['Đang chờ xử lý', 'Đang được xử lý', 'Đang vận chuyển', 'Đã hoàn thành']

    useEffect(() => {
        const fetchDataOrder = async () => {
            try {
                const order = await getOrderByIdOrderApi(idOrder);
                const dataOrder = await getAllOrderDetailByIdOrderApi(idOrder)
                setDataOrder(order.data);
                setListOrderDetail(dataOrder.data)
            } catch (error) {
                console.error("Failed to fetch order data:", error);
            }
        };
        fetchDataOrder();
    }, [idOrder]);

    return (
        <div className="OrderDetail">
            <div className="row-1">
                <p className="id-order">MÃ ĐƠN HÀNG: <strong>#DH{dataOrder?.idOrder}</strong></p>
                <div className="state-order">
                    {dataOrder?.status === 'Đang chờ xử lý' && <DangChoXuLy />}
                    {dataOrder?.status === 'Đang được xử lý' && <DangDuocXuLy />}
                    {dataOrder?.status === 'Đang vận chuyển' && <DangVanChuyen />}
                    {dataOrder?.status === 'Đã hoàn thành' && <DaHoanThanh />}
                </div>

            </div>
            <div className="row-2">
                {steps.map((step, index) => (
                    <div key={index} className={`step-item ${dataOrder?.status === step && 'active'}`} >
                        <div className="number-step">{dataOrder?.status === step ? <FaCheck /> : index + 1}</div>
                        <p className="title-step">{step}</p>
                    </div>
                ))}
            </div>
            <div className="row-3">
                <div className="wrap-profile">
                    <h2>Thông tin nhận hàng</h2>
                    <div className="profile">
                        <div className="title">
                            <p>Tên khách hàng:</p>
                            <p>Số điện thoại:</p>
                            <p>Email:</p>
                            <p>Địa chỉ giao hàng:</p>
                        </div>
                        <div className="content">
                            <p className="name">{customerData?.fullName}</p>
                            <p>{customerData?.phoneNumber}</p>
                            <p>{customerData?.email}</p>
                            <p>{customerData?.address}</p>
                        </div>
                    </div>

                </div>

                <div className="wrap-order-method">
                    <h2>Phương thức thanh toán</h2>
                    <p>Thanh toán khi nhận hàng</p>
                </div>
            </div>

            <div className="row-4">
                <h2>Danh sách các mặt hàng</h2>
                {listOrderDetail.map((item, index) =>
                    <ItemOrderDetail key={index} oderDetail={item} />
                )}
            </div>
            <div className="row-5">
                <GiTakeMyMoney className="icon-money" />
                <p className="title-money">Thành tiền: </p>
                <h3 className="money">{formatCurrency(dataOrder?.totalPrice)} VNĐ</h3>
            </div>
        </div>
    );
}

export default OrderDetail;
