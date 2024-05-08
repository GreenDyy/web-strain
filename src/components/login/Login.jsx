import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import { loginCustomerApi } from "../../apis/apiLogin";

function Login() {
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
            if (response?.token) {
                localStorage.setItem('token', response.token)
            }
            console.log(response.data)
            localStorage.setItem('userName', 'duy');
            console.log("luu duy thanh cong")
            localStorage.setItem('profileUser', JSON.stringify(response.data));
            alert('dang nhap thanh cong')
            console.log("Đăng nhap thanh cong va luu thong tin user")
        }
        catch (e) {
            console.log("Lỗi lấy API ", e)
        }
    }

    const handleLoginTest = ()=>{
        if (!username || !password) {
            console.log('Nhập đủ thông tin đi ba')
            alert('Vui lòng nhập đủ thông tin')
            //sau làm thêm cái Toast nữa
            return;
        }
        localStorage.setItem('username', username);

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
                    onClick={() => handleLoginTest()}
                >Đăng nhập</button>

                <div className="register-link">
                    <p>Chưa có tài khoản? <a href="#">Đăng ký ngay!</a></p>
                </div>
            </form>
        </div>
    )
}
export default Login