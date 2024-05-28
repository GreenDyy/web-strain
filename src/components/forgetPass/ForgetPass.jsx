import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './ForgetPass.scss';
import { TfiEmail } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { toastError, toastSuccess, toastWarning } from "../Toast/Toast";
import { sendOtpApi, verifyOtpApi } from "../../apis/apiAuth";
import { validateEmail } from "../../utils/Utils";
import { IoReload } from "react-icons/io5";
import { resetPasswordCustomerApi } from "../../apis/apiLogin";
import { HashLoader } from 'react-spinners';


function ForgetPass() {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPass, setNewPass] = useState('')
    const [reNewPass, setReNewPass] = useState('')
    const [step, setStep] = useState(1)
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()

    const handleSendOtp = async () => {
        if (email === '') {
            toastWarning('Bạn chưa nhập Email');
            return;
        }
        if (!validateEmail(email)) {
            toastWarning('Email không hợp lệ');
            return;
        }
        if (email !== '') {
            setSpinner(true)
            await sendOtpApi(email)
            setSpinner(false)
            toastSuccess('Chúng tôi vừa gửi 1 email đến bạn. Vui lòng kiểm tra hộp thư')
            setStep(2)
        }
        else {
            toastWarning('Bạn chưa nhập Email')
        }

    }

    const handleResetPassword = async () => {
        if (otp === '' || newPass === '' || reNewPass === '') {
            toastWarning('Vui lòng nhập đủ thông tin')
            return
        }
        if (newPass !== reNewPass) {
            toastWarning('Xác nhận mật khẩu không khớp')
            return
        }
        const response = await verifyOtpApi(email, otp)
        if (response.data.status === -1) {
            toastError('OTP của bạn đã hết hạn, vui lòng ấn gửi lại OTP')
        }
        if (response.data.status === 0) {
            toastError('OTP bạn nhập không chính xác, vui lòng kiểm tra lại')
        }
        if (response.data.status === 1) {
            await resetPasswordCustomerApi(email, reNewPass)
            toastSuccess('Đổi mật khẩu thành công')
            navigate('/Login')
        }
    }

    return (
        <div className="ForgetPass">
            <>
                {step == 1 ?
                    <form>
                        <h1>Quên mật khẩu</h1>
                        <div className="wrap-all-input">
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TfiEmail className="icon" />
                            </div>

                        </div>
                        <div className="wrap-btn-register">
                            <button className="btn-register" type="button" onClick={handleSendOtp}>Gửi OTP</button>
                            <HashLoader  
                                color="white"
                                loading = {spinner}
                                size={20}
                                cssOverride={{position:'absolute', right: 205, bottom: 102}}
                            />
                        </div>

                        <div className="register-link">
                            <p>Bạn nhớ lại rồi? <Link to='/Login'>Đăng nhập ngay!</Link></p>
                        </div>
                    </form>
                    :
                    <form>
                        <h1>Quên mật khẩu</h1>
                        <div className="wrap-all-input">
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Nhập OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu mới"
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                    required
                                />
                            </div>


                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu mới"
                                    value={reNewPass}
                                    onChange={(e) => setReNewPass(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button className="btn-register" type="button" onClick={handleResetPassword}>Đổi mật khẩu</button>
                        <div className="btn-otp" onClick={handleSendOtp}>
                            <IoReload className="icon-reload" />
                            <p className="title-otp"> Gửi lại mã OTP</p>
                        </div>
                    </form>
                }
            </>

        </div>
    );
}

export default ForgetPass;
