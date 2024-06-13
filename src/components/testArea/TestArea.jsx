import React, { useState, useEffect } from "react";
import './TestArea.scss'
import { useLocation } from 'react-router-dom';
import { paymenExcuteVNpayApi } from "../../apis/apiPayment";


function TestArea() {
    const location = useLocation();
    const [vnpParams, setVnpParams] = useState({
        vnp_Amount: '',
        vnp_BankCode: '',
        vnp_ResponseCode: '',
    })
    useEffect(() => {
        // Lấy các query params từ URL
        const searchParams = new URLSearchParams(location.search);
        const vnp_Amount = searchParams.get('vnp_Amount');

        const vnp_BankCode = searchParams.get('vnp_BankCode');
        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
        setVnpParams({ ...vnpParams, vnp_Amount: vnp_Amount, vnp_BankCode: vnp_BankCode, vnp_ResponseCode, vnp_ResponseCode })

        // Xử lý logic của bạn với các query params

    }, [location]);

    const getQueryParams = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const queryParams = {};
        for (let param of searchParams.entries()) {
            queryParams[param[0]] = param[1];
        }
        return queryParams;
    }

    // Sử dụng hàm paymenExcuteVNpayApi để gửi requestQuery lên server khi cần thiết
    const handlePaymentExcute = async () => {
        const requestQuery = getQueryParams(); // Lấy requestQuery từ URL
        try {
            const paymentResponse = await paymenExcuteVNpayApi(requestQuery);
            console.log('Payment response:', paymentResponse);
            // Xử lý kết quả thanh toán tại đây (hiển thị thông báo, cập nhật UI, ...)
        } catch (error) {
            console.error('Error handling payment:', error);
            // Xử lý lỗi khi xảy ra trong quá trình xử lý thanh toán
        }
    }
    return (
        <div className="TestArea">
            <p>vnp_Amount: {vnpParams?.vnp_Amount}</p>
            <p>vnp_BankCode: {vnpParams?.vnp_BankCode}</p>
            <p>vnp_ResponseCode: {vnpParams?.vnp_ResponseCode}</p>
            {
                vnpParams?.vnp_ResponseCode === '00' ?
                    <p>Thanh toán thành công</p>
                    :
                    <p>Lỗi thanh toán</p>
            }
            <button onClick={() => { handlePaymentExcute() }}>excute</button>
        </div>
    );
}

export default TestArea

