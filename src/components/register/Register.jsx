import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss'
import { FaUser, FaLock } from "react-icons/fa";
import { loginCustomerApi } from "../../apis/apiLogin";
import { getAllDetailCartApi, getAllTotalQuantityApi, getCartByIdCustomerApi } from "../../apis/apiCart";
import { toastError, toastWarning } from "../Toast/Toast";
//redux
import { useDispatch } from "react-redux";
import { login } from "../../srcRedux/features/customerSlice";
import { setAllDetailCart, setTotalAllProduct } from "../../srcRedux/features/cartSlice";


function Register() {
    const dispatch = useDispatch()
    const [gender, setGender] = useState('Chọn giới tính')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleRegister = async () => {
        console.log(username, password)
        if (!username || !password) {
            toastWarning('Vui lòng nhập đầy đủ thông tin')
            return;
        }
        try {


        }
        catch (e) {
            console.log(e)
            toastError("Lỗi đăng nhập, xem lại handleRegister")
        }
    }

    return (
        <div className="Register">
            <form>
                <h1>Đăng ký</h1>
                <div className="wrap-all-input">
                    <div className="wrap-name">
                        <div className="input-box">
                            <input type="text" placeholder="Họ" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Tên" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <FaLock className="icon" />
                        </div>
                    </div>

                    <div className="input-box">
                        <select onChange={(event) => { setGender(event.target.value) }}>
                            <option value="default">Chọn giớ tính của bạn</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <input type="date" placeholder="Ngày sinh" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="date" placeholder="Số điện thoại" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className="icon" />
                    </div>
                </div>

                <button className="btn-register" type="button" onClick={handleRegister}>Đăng ký</button>

                <div className="register-link">
                    <p>Đã có tài khoản? <Link to='/Login'>Đăng nhập ngay!</Link></p>
                </div>
            </form >
        </div >
    )
}
export default Register