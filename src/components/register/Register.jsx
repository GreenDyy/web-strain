import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { TbUserSquareRounded } from "react-icons/tb";

import { useDispatch } from "react-redux";
import { toastError, toastSuccess, toastWarning } from "../Toast/Toast";
import { loginCustomerApi, registerCustomerApi } from "../../apis/apiLogin";
import { login } from "../../srcRedux/features/customerSlice";
import { getAllTotalQuantityApi, getCartByIdCustomerApi } from "../../apis/apiCart";
import { setTotalAllProduct } from "../../srcRedux/features/cartSlice";
import { convertImageToVarBinary, validateEmail } from "../../utils/Utils";
import images from "../../constants/images";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const startYear = currentYear - 100;
const years = Array.from({ length: 100 }, (_, i) => startYear + i + 1);

function Register() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !email || !phoneNumber || !day || !month || !year || !gender) {
            toastWarning('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (!validateEmail(email)) {
            toastWarning('Email không hợp lệ');
            return;
        }
        if(password.length < 6) {
            toastWarning('Mật khẩu phải từ 6 kí tự');
            return;
        }
        try {
            const formattedMonth = String(month).padStart(2, '0');
            const formattedDay = String(day).padStart(2, '0');
            const imageBinary = await convertImageToVarBinary(images.avatarnull);
            //register
            const dataRegister = await registerCustomerApi({
                firstName: firstName,
                lastName: lastName,
                fullName: firstName + lastName,
                dateOfBirth: `${year}-${formattedMonth}-${formattedDay}`,
                gender: gender,
                email: email,
                phoneNumber: phoneNumber,
                address: null,
                image: imageBinary,
                username: username,
                password: password,
                status: "Đang hoạt động"
            })
            //nếu đăng ký thành công thì cho login
            if (dataRegister.status == 200) {
                const user = await loginCustomerApi(username, password)
                const cart = await getCartByIdCustomerApi(user.data.idCustomer)
                const allTotalProductInCart = await getAllTotalQuantityApi(cart.data.idCart)
                //lưu vào redux
                dispatch(login({
                    customerData: user.data,
                    idCart: cart.data.idCart
                }))
                dispatch(setTotalAllProduct(allTotalProductInCart.data));
                navigate('/Home')
            }
            else {
                toastError("Tên đăng nhập đã tồn tại")
            }

        } catch (e) {
            console.log(e);
            toastError("Tên đăng nhập đã tồn tại");
        }
        console.log(firstName, lastName, email, phoneNumber, username, password, gender, day, month, year)
    };

    const validatePhoneNumber = (event) => {
        const value = event.target.value;
        const newValue = value.replace(/\D/, ''); // Loại bỏ các ký tự không phải số
        if (value.length <= 10) {
            setPhoneNumber(newValue)
        }

    }

    return (
        <div className="Register">
            <form>
                <h1>Đăng ký</h1>
                <div className="wrap-all-input">
                    <div className="input-box one-col-30">
                        <input
                            type="text"
                            placeholder="Họ"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <TbUserSquareRounded className="icon icon-name" />
                    </div>

                    <div className="input-box one-col-70">
                        <input
                            type="text"
                            placeholder="Tên"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <TbUserSquareRounded className="icon icon-name" />
                    </div>

                    <div className="input-box">
                        <select value={gender} onChange={(event) => setGender(event.target.value)}>
                            <option value="">Chọn giới tính của bạn</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>

                        </select>
                    </div>

                    <div className="input-box three-col">
                        <select className="day" value={day} onChange={(event) => setDay(event.target.value)}>
                            <option value="">Ngày</option>
                            {days.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-box three-col">
                        <select className="month" value={month} onChange={(event) => setMonth(event.target.value)}>
                            <option value="">Tháng</option>
                            {months.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-box three-col">
                        <select className="year" value={year} onChange={(event) => setYear(event.target.value)}>
                            <option value="">Năm</option>
                            {years.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        < TfiEmail className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            value={phoneNumber}
                            onChange={validatePhoneNumber}
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
