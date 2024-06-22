import React, { useState, useEffect } from "react";
import './Order.scss'
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem/OrderItem";
import { deleteOrder, deleteOrderDetail, getAllOrderByIdCustomerApi, getAllOrderDetailByIdOrderApi } from "../../apis/apiPayment";
import { useNavigate } from "react-router-dom";
import { images } from "../../constants";
import { toastError, toastSuccess } from "../Toast/Toast";
import { toast } from "react-toastify";

function Order() {
    const customerData = useSelector(state => state.customer.customerData)
    const [listOrder, setListOrder] = useState([])
    const [tab, setTab] = useState(1)
    const [reloadData, setReloadData] = useState(false)
    const navigate = useNavigate()
    const tinhTrangs = ['Tất cả', 'Đang chờ xử lý', 'Đang được xử lý', 'Đang vận chuyển', 'Đã hoàn thành']

    useEffect(() => {
        const fetchDataOrder = async () => {
            const dataOrder = await getAllOrderByIdCustomerApi(customerData?.idCustomer)
            setListOrder(dataOrder.data)
            setReloadData(false)
        }
        fetchDataOrder()
    }, [reloadData])

    const handleDestroyOrder = (idOrder) => {
        toast.dark(
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ color: 'black' }}>Bạn có chắc muốn hủy đơn hàng <strong>#DH{idOrder}</strong> không?</p>

                <div className='toast-confirm' style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='btn-cancel'
                        style={{ backgroundColor: '#00A551', color: 'white', borderRadius: 3, flex: 1, marginRight: 5 }}
                        onClick={() => confirmDestroyOrder(idOrder)}>Có</button>
                    <button className='btn-comfirm'
                        style={{ backgroundColor: 'white', color: 'black', border: '0.5px solid gray', borderRadius: 3, flex: 1, marginLeft: 5 }}
                        onClick={() => toast.dismiss()}>Không</button>
                </div>

            </div>,
            {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
    }

    const confirmDestroyOrder = async (idOrder) => {
        const listOrderDetail = await getAllOrderDetailByIdOrderApi(idOrder)
        try {
            for (const orderDetail of listOrderDetail.data) {
                await deleteOrderDetail(orderDetail.idOrderDetail)
            }
            await deleteOrder(idOrder)
            setReloadData(true)
            toast.dismiss()
            toastSuccess("Hủy đơn hàng thành công")
        }
        catch {
            toast.dismiss()
            toastError("Có lỗi xảy ra")
        }
        console.log(listOrderDetail.data)
    }

    return (
        <>
            {listOrder.length !== 0 ?
                <div className="Order">
                    <div className="wrap-state">
                        {tinhTrangs.map((tinhTrang, index) => (
                            <button className={`btn-state ${tab === index + 1 ? 'active' : ''}`}
                                key={index}
                                onClick={() => setTab(index + 1)}
                            >{tinhTrang}</button>
                        ))}
                    </div>

                    <div className="wrap-order" >
                        {tab === 1 &&
                            listOrder.sort((a, b) => {
                                const listStatus = {
                                    'Đang chờ xử lý': 1,
                                    'Đang được xử lý': 2,
                                    'Đang vận chuyển': 3,
                                    'Đã hoàn thành': 4,
                                }
                                return listStatus[a.status] - listStatus[b.status]

                            }).map((item, index) => {
                                return (
                                    <OrderItem
                                        key={index}
                                        order={item}
                                        onClick={() => navigate(`/OrderDetail/${item.idOrder}`)}
                                        onHandleDestroyOrder={handleDestroyOrder}
                                    />
                                )
                            })
                        }
                        {tab === 2 &&
                            listOrder.filter(o => o.status === 'Đang chờ xử lý').map((item, index) => {
                                return (
                                    <OrderItem
                                        key={index}
                                        order={item}
                                        onClick={() => navigate(`/OrderDetail/${item.idOrder}`)}
                                        onHandleDestroyOrder={handleDestroyOrder}
                                    />
                                )
                            })
                        }
                        {tab === 3 &&
                            listOrder.filter(o => o.status === 'Đang được xử lý').map((item, index) => {
                                return (
                                    <OrderItem
                                        key={index}
                                        order={item}
                                        onClick={() => navigate(`/OrderDetail/${item.idOrder}`)}
                                        onHandleDestroyOrder={handleDestroyOrder}
                                    />
                                )
                            })
                        }
                        {tab === 4 &&
                            listOrder.filter(o => o.status === 'Đang vận chuyển').map((item, index) => {
                                return (
                                    <OrderItem
                                        key={index}
                                        order={item}
                                        onClick={() => navigate(`/OrderDetail/${item.idOrder}`)}
                                        onHandleDestroyOrder={handleDestroyOrder}
                                    />
                                )
                            })
                        }
                        {tab === 5 &&
                            listOrder.filter(o => o.status === 'Đã hoàn thành').map((item, index) => {
                                return (
                                    <OrderItem
                                        key={index}
                                        order={item}
                                        onClick={() => navigate(`/OrderDetail/${item.idOrder}`)}
                                        onHandleDestroyOrder={handleDestroyOrder}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                :
                <div className='empty-order'>
                    <img className='img-empty-order' src={images.emptyorder}/>
                    <h2 className='title'>Bạn chưa có đơn hàng nào</h2>
                    <p className='content'>Hãy đến trang chủ và khám phá các sản phẩm của chúng tôi</p>
                    <button className='btn-login' onClick={() => navigate('/')}>Đi tới trang chủ</button>
                </div>
            }
        </>
    )
}

export default Order