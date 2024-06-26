import React, { useState } from "react";
import './LoginEmployee.scss'
import { images, icons } from '../../../constants'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { login } from "../../../srcRedux/features/employeeSlice";
import { toastError, toastWarning } from "../../Toast/Toast";
import { loginEmployeeApi } from "../../../apis/apiLoginEmployee";

function LoginEmployee() {
    const dispatch = useDispatch()
    const [employeename, setemployeename] = useState('')
    const [password, setPassword] = useState('')
    const [spinner, setSpinner] = useState(false)

    const navigate = useNavigate();

    const handleLogin = async () => {
        setSpinner(true)
        if (!employeename || !password) {
            toastWarning('Vui lòng nhập đầy đủ thông tin')
            setSpinner(false)
            return;
        }
        try {
            const employee = await loginEmployeeApi(employeename, password)
            if (employee.data) {
                //3 là nghien cuu vien
                // if(employee.data.idRole !== 3) {
                //     toastWarning('Bạn không có quyền đăng nhập vào trang này')
                //     return
                // }
                dispatch(login({ employeeData: employee.data }))
                navigate('/Home')
            }
            else {
                setSpinner(false)
                toastError("Sai tên tài khoản hoặc mật khẩu")
            }

            navigate('/Employee/DashBoard', { replace: true })
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
                            <input className="input-text" type="text" placeholder="Tên đăng nhập" value={employeename} onChange={(e) => setemployeename(e.target.value)} required />
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