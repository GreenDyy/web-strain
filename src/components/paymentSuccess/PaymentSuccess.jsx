import React, { useState } from "react";
import './PaymentSuccess.scss'
import { images } from '../../constants'
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getDataLocalStorage } from "../../utils/Utils";

function PaymentSuccess() {
    const steps = ['Đang chờ xử lý', 'Đang được xử lý', 'Đang vận chuyển', 'Đã hoàn thành']

    const navigate = useNavigate()

    return (
        <div className="PaymentSuccess">
            <img className="img-success" src={images.success} />
            <h1 className="title-success">Thanh toán thành công!</h1>
            <p>Cảm ơn bạn đã mua sản phẩm của chúng tôi!</p>
            <div className="row">
                <div className="col-1">
                    <div className="wrap-title">
                        <h3>Thanh toán thành công!</h3>
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
                        <button className="btn-order" onClick={()=>navigate(`/OrderDetail/${getDataLocalStorage('lastIdOrder')}`)}>Xem đơn hàng</button>
                        <button className="btn-home" onClick={() => navigate('/')}>Về trang chủ</button>
                    </div>

                </div>

                <div className="col-2">
                    <img className="img-col-2" src="https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg" />
                </div>
            </div>
        </div >
    )
}

export default PaymentSuccess