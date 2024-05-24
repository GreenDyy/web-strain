import React, { useState, useEffect } from "react";
import './Profile.scss'
import { getCustomerApi, updateCustomerApi } from "../../apis/apiLogin";
import { useSelector } from "react-redux";
//icon
import { FaUserAstronaut, FaMapLocationDot } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { toastError, toastSuccess } from "../Toast/Toast";

import { useDispatch } from "react-redux";
import { changeData } from "../../srcRedux/features/customerSlice";

function Profile() {
    const customerData = useSelector(state => state.customer.customerData)
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

    const [showCancel, setShowCancel] = useState(false)
    const [tab, setTab] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        setFirstName(customerData.firstName)
        setLastName(customerData.lastName)
        setPhoneNumber(customerData.phoneNumber)
        setEmail(customerData.email)
        setUsername(customerData.username)
        setPassword(customerData.password)


    }, [])

    useEffect(() => {
        if (customerData.firstName !== firstName || customerData.lastName !== lastName || customerData.email !== email || customerData.phoneNumber !== phoneNumber) {
            setShowCancel(true)
        }
        else {
            setShowCancel(false)
        }
    }, [firstName, lastName, email, phoneNumber])

    const handleResetData = () => {
        setFirstName(customerData.firstName)
        setLastName(customerData.lastName)
        setPhoneNumber(customerData.phoneNumber)
        setEmail(customerData.email)
        setUsername(customerData.username)
        setPassword(customerData.password)
    }

    const handleSaveChangeData = async () => {
        try {
            await updateCustomerApi(customerData.idCustomer, {
                firstName: firstName,
                lastName: lastName,
                fullName: `${firstName} ${lastName}`,
                dateOfBirth: customerData.dateOfBirth,
                gender: customerData.gender,
                email: email,
                phoneNumber: phoneNumber,
                username: customerData.username,
                password: customerData.password,
                status: "Đang hoạt động"
            });
            const dataAfterChange = await getCustomerApi(customerData.idCustomer);
            dispatch(changeData({
                customerData: dataAfterChange.data,
            }));
            setShowCancel(false)
            toastSuccess('Thay đổi thành công!', 'top-center');
        } catch (e) {
            console.error('Error:', e);
            toastError(`Lỗi: ${e.message}`, 'top-center');
        }
    };


    return (
        <div className="Profile">
            <div className="col-1">
                <div className="card-image">
                    <img className="avatar" src="https://i.pinimg.com/564x/4a/b0/43/4ab043ca07ea63b79083f586c9fdf13e.jpg" />
                </div>
                <h3 className="name">{customerData?.fullName}</h3>
                <div className="card-feature">
                    <div className="feature" onClick={() => setTab(1)}>
                        <p>Thông tin cá nhân</p>
                        <FaUserAstronaut className="icon" />
                    </div>
                    <div className="feature" onClick={() => setTab(2)}>
                        <p>Đổi mật khẩu</p>
                        <IoMdLock className="icon" />
                    </div>
                    <div className="feature" onClick={() => setTab(3)}>
                        <p>Địa chỉ giao hàng</p>
                        <FaMapLocationDot className="icon" />
                    </div>
                </div>
            </div>

            <div className="col-2">
                {tab === 1 &&
                    <>
                        <h3 className="title">Thông tin cá nhân</h3>

                        <div className="wrap-all-input">
                            <div className="wrap-input">
                                <p className="label">Họ</p>
                                <div className="input-box">
                                    <input type="text" value={lastName ? lastName : ''} onChange={(event) => { setLastName(event.target.value) }} />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Tên</p>
                                <div className="input-box">
                                    <input type="text" value={firstName ? firstName : ''} onChange={(event) => { setFirstName(event.target.value) }} />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Email</p>
                                <div className="input-box">
                                    <input type="text" value={email ? email : ''} onChange={(event) => { setEmail(event.target.value) }} />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Số điện thoại</p>
                                <div className="input-box">
                                    <input type="text" value={phoneNumber ? phoneNumber : ''} onChange={(event) => { setPhoneNumber(event.target.value) }} />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Tài khoản</p>
                                <div className="input-box">
                                    <input type="text" value={username ? username : ''} onChange={(event) => { setUsername(event.target.value) }} disabled />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Mật khẩu</p>
                                <div className="input-box">
                                    <input type="password" value={password ? password : ''} onChange={(event) => { setPassword(event.target.value) }} disabled />
                                </div>
                            </div>
                        </div>


                        <div className="wrap-btn">
                            {showCancel && <button className="btn-cancel" onClick={handleResetData}>Hủy thay đổi</button>}

                            <button className="btn-save" onClick={handleSaveChangeData}>Lưu</button>
                        </div>
                    </>
                }

                {tab === 2 &&
                    <>
                        <h3 className="title">Đổi mật khẩu</h3>

                        <div className="wrap-all-input">
                            <div className="wrap-input">
                                <p className="label">Họ</p>
                                <div className="input-box">
                                    <input type="text" value={lastName ? lastName : ''} onChange={(event) => { setLastName(event.target.value) }} />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Tên</p>
                                <div className="input-box">
                                    <input type="text" value={firstName ? firstName : ''} onChange={(event) => { setFirstName(event.target.value) }} />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Email</p>
                                <div className="input-box">
                                    <input type="text" value={email ? email : ''} onChange={(event) => { setEmail(event.target.value) }} />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Số điện thoại</p>
                                <div className="input-box">
                                    <input type="text" value={phoneNumber ? phoneNumber : ''} onChange={(event) => { setPhoneNumber(event.target.value) }} />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Tài khoản</p>
                                <div className="input-box">
                                    <input type="text" value={username ? username : ''} onChange={(event) => { setUsername(event.target.value) }} disabled />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Mật khẩu</p>
                                <div className="input-box">
                                    <input type="password" value={password ? password : ''} onChange={(event) => { setPassword(event.target.value) }} disabled />
                                </div>
                            </div>
                        </div>


                        <div className="wrap-btn">
                            {showCancel && <button className="btn-cancel" onClick={handleResetData}>Hủy thay đổi</button>}

                            <button className="btn-save" onClick={handleSaveChangeData}>Lưu</button>
                        </div>
                    </>
                }

                {tab === 3 &&
                    <>
                        <h3 className="title">Địa chỉ giao hàng</h3>

                        <div className="wrap-all-input">
                            <div className="wrap-input">
                                <p className="label">Địa chỉ của bạn</p>
                                <div className="input-box">
                                    <input type="text" value={lastName ? lastName : ''} onChange={(event) => { setLastName(event.target.value) }} />
                                </div>
                            </div>


                        </div>


                        <div className="wrap-btn float-left">
                            <button className="btn-save" onClick={handleSaveChangeData}>Lưu</button>
                        </div>
                    </>
                }




            </div>
        </div >
    )
}

export default Profile