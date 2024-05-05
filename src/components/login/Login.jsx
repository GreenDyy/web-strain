import React from "react";
import './Login.css'
import { Link } from 'react-router-dom'
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
    return (
        <div className="Login">
            <form action="">
                <h1>Đăng nhập</h1>
                <div className="input-box">
                    <input type="text" placeholder="Tên đăng nhập" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Mật khẩu" required />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label> <input type="checkbox" />Nhớ mật khẩu</label>
                    <a href="#">Quên mật khẩu</a>
                </div>

                <button type="submit">Đăng nhập</button>

                <div className="register-link">
                    <p>Chưa có tài khoản? <a href="#">Đăng ký ngay!</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login