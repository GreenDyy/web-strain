import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import { loginCustomerApi } from "../../apis/apiLogin";
import { useDispatch } from "react-redux";
import { login } from "../../srcRedux/features/customerSlice";
import { getDataLocalStorage, setDataLocalStorage } from "../../utils/Utils";
import { toast } from "react-toastify";
import { getAllDetailCart, getCartByIdCustomer } from "../../apis/apiCart";

function Login() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const checkLogined = async () => {
            const user = getDataLocalStorage('user');
            if (!user) {
                console.log('Check xem có user trong local chưa')
                return
            }
            else {

                const response = await loginCustomerApi(user.data.username, user.data.password)
                const cart = await getCartByIdCustomer(response.data.data.idCustomer)
                //lưu vào redux
                dispatch(login(response.data))
                //lưu vào local
                setDataLocalStorage('user', response.data)
                setDataLocalStorage('idCart', cart.data.idCart)
                navigate('/Home')
                console.log('Đã Auto Login')
            }
        }
        checkLogined()
    }, [])


    const handleLogin = async () => {
        console.log(username, password)
        if (!username || !password) {
            // alert('Vui lòng nhập đủ thông tin')
            toast("Vui lòng nhập đủ thông tin")
            //sau làm thêm cái Toast nữa
            return;
        }
        try {
            const response = await loginCustomerApi(username, password)
            const cart = await getCartByIdCustomer(response.data.data.idCustomer)
            const listDetailCart = await getAllDetailCart(cart.data.idCart)
            // if (response?.token) {
            //     localStorage.setItem('token', response.token)
            // }

            if (response.data.success) {
                console.log(response.data)
                alert('Đăng nhập thành công')
                //lưu vào redux
                dispatch(login(response.data))
                //lưu vào local
                setDataLocalStorage('user', response.data)
                setDataLocalStorage('idCart', cart.data.idCart)
                setDataLocalStorage('cart', listDetailCart)
                navigate('/Home')
            }
            else
                alert('Sai tên tài khoản hoặc mật khẩu')

        }
        catch (e) {
            console.log("Lỗi lấy API: " + e)
        }
    }

    return (
        <div className="Login">
            <form>
                <h1>Đăng nhập</h1>
                <div>
                    <div className="input-box">
                        <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className="icon" />
                    </div>
                </div>

                <div className="remember-forgot">
                    <label> <input type="checkbox" />Nhớ mật khẩu</label>
                    <a href="#">Quên mật khẩu</a>
                </div>

                <button
                    type="button"
                    onClick={handleLogin}
                >Đăng nhập</button>

                <div className="register-link">
                    <p>Chưa có tài khoản? <a href="#">Đăng ký ngay!</a></p>
                </div>
            </form>
            {/* <button
                type="submit"
                onClick={handleLogin}
            >Test</button> */}
        </div>
    )
}
export default Login