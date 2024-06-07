import React, { useState } from "react";
import './LoginEmployee.scss'
import { images, icons } from '../../../constants'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { FaLock, FaUser } from "react-icons/fa";
import { toastError, toastWarning } from "../../Toast/Toast";

function LoginEmployee() {
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
            // const user = await loginCustomerApi(username, password)

            // if (response?.token) {
            //     localStorage.setItem('token', response.token)
            // }

            // if (user.data) {
            //     //lưu vào redux
            //     // dispatch(login({
            //     //     customerData: user.data,
            //     //     idCart: cart.data.idCart
            //     // }))
            //     navigate('/Home')
            // }
            // else {
            //     setSpinner(false)
            //     toastError("Sai tên tài khoản hoặc mật khẩu")
            // }
     
            navigate('/Employee/DashBoard', {replace: true})
        }
        catch (e) {
            console.log(e)
            setSpinner(false)
            toastError("Sai tên tài khoản hoặc mật khẩu")
        }
    }
    return (
        <div className="LoginEmployee">
            <div className="col-1">
                <div className="wrap-logo">
                    <img className="icon-logo" src={icons.logo} />
                    <h2 className="title">VIỆN NGHIÊN CỨU ỨNG DỤNG VÀ CHUYỂN GIAO CÔNG NGHỆ</h2>
                </div>

                <form className="form">
                    <h2>ĐĂNG NHẬP</h2>
                    <div>
                        <div className="input-box">
                            <input className="input-text" type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="input-box">
                            <input className="input-text" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>

                    <button className="btn-login"
                        type="button" onClick={handleLogin}>Đăng nhập</button>
                    <HashLoader
                        color="white"
                        loading={spinner}
                        size={20}
                        cssOverride={{ position: 'absolute', right: 198, bottom: 100 }}
                    />
                </form>
            </div>

            <div className="col-2">
                <img className="img-bg" src={images.bgloginemployee} />
            </div>
        </div>
    )
}

export default LoginEmployee