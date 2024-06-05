import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import { loginCustomerApi } from "../../apis/apiLogin";
import { getAllTotalQuantityApi, getCartByIdCustomerApi } from "../../apis/apiCart";
import { toastError, toastWarning } from "../Toast/Toast";
//redux
import { useDispatch } from "react-redux";
import { login } from "../../srcRedux/features/customerSlice";
import { setTotalAllProduct } from "../../srcRedux/features/cartSlice";
import { HashLoader } from "react-spinners";

function Login() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [spinner, setSpinner] = useState(false)

    const navigate = useNavigate();

    const handleLogin = async () => {
        setSpinner(true)
        if (!username || !password) {
            toastWarning('Vui lòng nhập đầy đủ thông tin')
            setSpinner(false)
            return;
        }
        try {
            const user = await loginCustomerApi(username, password)

            // if (response?.token) {
            //     localStorage.setItem('token', response.token)
            // }

            if (user.data) {
                const cart = await getCartByIdCustomerApi(user.data.idCustomer)
                const allTotalProductInCart = await getAllTotalQuantityApi(cart.data.idCart)
                //lưu vào redux
                dispatch(login({
                    customerData: user.data,
                    idCart: cart.data.idCart
                }))
                dispatch(setTotalAllProduct(allTotalProductInCart.data));
                navigate('/Home', {replace: true})
            }
            else {
                setSpinner(false)
                toastError("Sai tên tài khoản hoặc mật khẩu")
            }
        }
        catch (e) {
            console.log(e)
            setSpinner(false)
            toastError("Sai tên tài khoản hoặc mật khẩu")
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
                    <Link to='/ForgetPass'>Quên mật khẩu</Link>
                </div>

                <button className="btn-login"
                    type="button" onClick={handleLogin}>Đăng nhập</button>
                <HashLoader
                    color="white"
                    loading={spinner}
                    size={20}
                    cssOverride={{ position: 'absolute', right: 198, bottom: 100 }}
                />

                <div className="register-link">
                    <p>Chưa có tài khoản? <Link to='/Register'>Đăng ký ngay!</Link></p>
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