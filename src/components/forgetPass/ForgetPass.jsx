import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './ForgetPass.scss';
import { TfiEmail } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { toastError, toastSuccess, toastWarning } from "../Toast/Toast";

function ForgetPass() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleResetPass = () => {
        toastSuccess('Chúng tôi vừa gửi 1 email đến bạn. Vui lòng kiểm tra hộp thư')
    }

    return (
        <div className="ForgetPass">
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
                <button className="btn-register" type="button" onClick={handleResetPass}>Khôi phục mật khẩu</button>
                <div className="register-link">
                    <p>Bạn nhớ lại rồi à? <Link to='/Login'>Đăng nhập ngay!</Link></p>
                </div>
            </form>
        </div>
    );
}

export default ForgetPass;
