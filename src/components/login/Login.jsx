import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import { loginCustomerApi } from "../../apis/apiLogin";
import { getAllDetailCartApi, getAllTotalQuantityApi, getCartByIdCustomerApi } from "../../apis/apiCart";
import { toastError, toastWarning } from "../Toast/Toast";
//redux
import { useDispatch } from "react-redux";
import { login } from "../../srcRedux/features/customerSlice";
import { setAllDetailCart } from "../../srcRedux/features/cartSlice";
import { setDataLocalStorage } from "../../utils/Utils";


function Login() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log(username, password)
        if (!username || !password) {
            toastWarning('Vui lòng nhập đầy đủ thông tin')
            return;
        }
        try {
            const user = await loginCustomerApi(username, password)

            // if (response?.token) {
            //     localStorage.setItem('token', response.token)
            // }

            if (user.data.success) {
                const cart = await getCartByIdCustomerApi(user.data.data.idCustomer)
                const listDetailCart = await getAllDetailCartApi(cart.data.idCart)
                const allTotalProductInCart = await getAllTotalQuantityApi(cart.data.idCart)

                console.log("total bên login từ API", allTotalProductInCart.data)

                //lưu vào redux
                dispatch(login({
                    customerData: user.data,
                    idCart: cart.data.idCart
                }))
                // dispatch(setAllDetailCart(listDetailCart.data))
                // dispatch(setTotalQuantity(allTotalProductInCart.data))
                setDataLocalStorage('totalProductInCart', allTotalProductInCart.data)
                navigate('/Home')
            }
            else
                toastError("Sai tên tài khoản hoặc mật khẩu")

        }
        catch (e) {
            console.log(e)
            toastError("Lỗi đăng nhập, xem lại handleLogin")
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