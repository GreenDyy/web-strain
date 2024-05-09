import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import { loginCustomerApi } from "../../apis/apiLogin";
import { useDispatch } from "react-redux";
import { login } from "../../srcRedux/features/customerSlice";

function Login() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            console.log('Nhập đủ thông tin đi ba')

            alert('Vui lòng nhập đủ thông tin')
            //sau làm thêm cái Toast nữa
            return;
        }
        try {
            const response = await loginCustomerApi(username, password)
            // if (response?.token) {
            //     localStorage.setItem('token', response.token)
            // }
          
            if (response != null) {
                console.log(response.data)
                alert('dang nhap thanh cong')

                dispatch(login(response.data))

                navigate('/Home')
            }
        }
        catch (e) {
            if(e.response   && e.response.status === 404)
                {
                    alert('Sai tên tài khoản hoặc mật khẩu')
                }
            console.log("Lỗi lấy API ", e)
            localStorage.setItem('loginError', e)
            localStorage.setItem('user', username)
            localStorage.setItem('pass', password)
        }
    }

    const handleLoginTest = () => {
        if (!username || !password) {
            console.log('Nhập đủ thông tin đi ba')
            alert('Vui lòng nhập đủ thông tin')
            //sau làm thêm cái Toast nữa
            return;
        }
        dispatch(login({
            id: '1',
            name: 'khánh duy'
        }))

        // Chuyển hướng đến trang Home
        navigate('/Home')

    }

    return (
        <div className="Login">
            <form action="">
                <h1>Đăng nhập</h1>
                <div className="input-box">
                    <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label> <input type="checkbox" />Nhớ mật khẩu</label>
                    <a href="#">Quên mật khẩu</a>
                </div>

                <button
                    // type="submit"
                    onClick={handleLogin}
                >Đăng nhập</button>

                <div className="register-link">
                    <p>Chưa có tài khoản? <a href="#">Đăng ký ngay!</a></p>
                </div>
            </form>
        </div>
    )
}
export default Login