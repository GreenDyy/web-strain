import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { LuUserSquare } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toastError, toastWarning } from "../Toast/Toast";
import { loginCustomerApi, registerCustomer, registerCustomerApi } from "../../apis/apiLogin";
import { login } from "../../srcRedux/features/customerSlice";
import { getAllTotalQuantityApi, getCartByIdCustomerApi } from "../../apis/apiCart";
import { setTotalAllProduct } from "../../srcRedux/features/cartSlice";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 2023 - 1900 + 1 }, (_, i) => 1900 + i);

function Register() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('Chọn giới tính');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !email || !phoneNumber || !day || !month || !year || gender === 'Chọn giới tính') {
            toastWarning('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        try {
            //check tài khoản tồn tại chưa đã 

            //register
            const dataRegister = await registerCustomerApi({
                firstName: firstName,
                lastName: lastName,
                fullName: firstName + lastName,
                dateOfBirth: "2002-05-24",
                gender: gender,
                email: email,
                phoneNumber: phoneNumber,
                username: username,
                password: password,
                status: "Đang hoạt động"
            })
            //nếu đăng ký thành công thì cho login
            if (dataRegister.status === 200) {
                try {
                    const user = await loginCustomerApi(username, password)
                    const cart = await getCartByIdCustomerApi(user.data.idCustomer)
                    const allTotalProductInCart = await getAllTotalQuantityApi(cart.data.idCart)
                    console.log("total bên login từ API", allTotalProductInCart.data)
                    //lưu vào redux
                    dispatch(login({
                        customerData: user.data,
                        idCart: cart.data.idCart
                    }))
                    dispatch(setTotalAllProduct(allTotalProductInCart.data));
                    navigate('/Home')
                }
                catch (e) {
                    console.log(e)
                    toastError("Lỗi đăng nhập, xem lại handleLogin")
                }
            }

        } catch (e) {
            console.log(e);
            toastError("Lỗi đăng ký, xem lại handleRegister");
        }
        console.log(firstName, lastName, email, phoneNumber, username, password, gender, day, month, year)
    };

    return (
        <div className="Register">
            <form>
                <h1>Đăng ký</h1>
                <div className="wrap-all-input">
                    <div className="wrap-name">
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Họ"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Tên"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <FaLock className="icon" />
                        </div>
                    </div>
                    <div className="input-box">
                        <select value={gender} onChange={(event) => setGender(event.target.value)}>
                            <option value="">Chọn giới tính của bạn</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <div className="wrap-name">
                        <div className="input-box day">
                            <select className="day" value={day} onChange={(event) => setDay(event.target.value)}>
                                <option value="">Ngày</option>
                                {days.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-box">
                            <select className="month" value={month} onChange={(event) => setMonth(event.target.value)}>
                                <option value="">Tháng</option>
                                {months.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-box">
                            <select className="year" value={year} onChange={(event) => setYear(event.target.value)}>
                                <option value="">Năm</option>
                                {years.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <MdOutlineMail className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        <FaPhone className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                </div>
                <button className="btn-register" type="button" onClick={handleRegister}>Đăng ký</button>
                <div className="register-link">
                    <p>Đã có tài khoản? <Link to='/Login'>Đăng nhập ngay!</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Register;
