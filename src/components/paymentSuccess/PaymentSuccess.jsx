import React, { useEffect, useState } from "react";
import './PaymentSuccess.scss'
import { images } from '../../constants'
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getDataLocalStorage, setDataLocalStorage } from "../../utils/Utils";
import { useLocation } from 'react-router-dom';
import { addOrderDetailApi, createOrderApi, sendMailOrderApi } from "../../apis/apiPayment";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryByIdStrainApi } from "../../apis/apiInventory";
import { removeDetailCartApi } from "../../apis/apiCart";
import { setTotalAllProduct } from "../../srcRedux/features/cartSlice";
import { toastError } from "../Toast/Toast";

function PaymentSuccess() {
    const location = useLocation();
    const [vnpParams, setVnpParams] = useState({
        vnp_Amount: '',
        vnp_BankCode: '',
        vnp_ResponseCode: '',
    })
    const steps = ['Đang chờ xử lý', 'Đang được xử lý', 'Đang vận chuyển', 'Đã hoàn thành']
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        // Lấy các query params từ URL
        const searchParams = new URLSearchParams(location.search);
        const vnp_Amount = searchParams.get('vnp_Amount');
        const vnp_BankCode = searchParams.get('vnp_BankCode');
        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
        setVnpParams({
            vnp_Amount: vnp_Amount,
            vnp_BankCode: vnp_BankCode,
            vnp_ResponseCode: vnp_ResponseCode,
        });

    }, [location]);

    useEffect(() => {
        const createNewOrder = async () => {
            if (vnpParams?.vnp_ResponseCode === "00") {
                await handleCreateOrder();
            }
        };
        createNewOrder();
    }, [vnpParams]);

    const handleCreateOrder = async () => {
        //lấy data request từ bên Payment nảy gửi lên stogare ấy 
        const dataOrder = getDataLocalStorage('dataOrder')
        const dataListDetailCart = getDataLocalStorage('dataListDetailCart')
        
        //tạo đơn
        if (vnpParams) {
            
            const newOrder = await createOrderApi(dataOrder?.idCustomer, vnpParams?.vnp_Amount, dataOrder?.note, 
                dataOrder?.address, dataOrder?.paymentMethod, dataOrder?.statusOrder)
            //tạo các detail đơn
            for (const detailCart of dataListDetailCart) {
                const inventory = await getInventoryByIdStrainApi(detailCart.idStrain);
                const totalPriceOneProduct = detailCart.quantityOfStrain * inventory.data.price;
                await addOrderDetailApi(newOrder.data.idOrder, detailCart.idStrain, detailCart.quantityOfStrain, totalPriceOneProduct);
            }
            dispatch(setTotalAllProduct(0))
            setDataLocalStorage('lastIdOrder', newOrder.data.idOrder)

            //tạo bill
            //xoá cart
            for (const detailCart of dataListDetailCart) {
                await removeDetailCartApi(detailCart.idCartDetail)
            }
            //gửi mail 
            await sendMailOrderApi(newOrder.data.idOrder)
        }
        else {
            toastError('Tạo đơn khi thanh toán online không thành công')
        }
    }

    return (
        <>
            {vnpParams?.vnp_ResponseCode === "00" || !vnpParams?.vnp_ResponseCode ?
                <div className="PaymentSuccess">
                    <img className="img-success" src={images.success} />
                    <h1 className="title-success">Đặt hàng thành công!</h1>
                    <p>Cảm ơn bạn đã mua sản phẩm của chúng tôi!</p>
                    <div className="row">
                        <div className="col-1">
                            <div className="wrap-title">
                                <h3>Đặt hàng thành công!</h3>
                                <img className="img-success" src={images.success} />
                            </div>
                            <p>Đơn hàng đang được xử lý, chúng tôi sẽ sớm liên lạc với bạn</p>
                            <div className="process-bar">
                                {steps.map((step, index) => (
                                    <div className={`step-item ${index === 0 && 'active'}`} key={index} >
                                        <div className="number-step">{index === 0 ? <FaCheck /> : index + 1}</div>
                                        <p className="title-step">{step}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="wrap-btn">
                                <button className="btn-order" onClick={() => navigate(`/OrderDetail/${getDataLocalStorage('lastIdOrder')}`)}>Xem đơn hàng</button>
                                <button className="btn-home" onClick={() => navigate('/')}>Về trang chủ</button>
                            </div>

                        </div>

                        <div className="col-2">
                            <img className="img-col-2" src={images.illustration8} />
                        </div>
                    </div>
                </div >
                :
                <div className="PaymentFail">
                    <img src={images.paymentfail} />
                    <p>Thanh toán không thành công. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.</p>
                    <button className="btn-home" onClick={() => navigate('/')}>Về trang chủ</button>
                </div>
            }

            {/* {vnpParams?.vnp_ResponseCode === '24' && <p>fail</p>} */}

        </>

    )
}

export default PaymentSuccess