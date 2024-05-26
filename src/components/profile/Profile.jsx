import React, { useState, useEffect, useRef } from "react";
import './Profile.scss'
import { getCustomerApi, updateCustomerApi } from "../../apis/apiLogin";
import { useSelector } from "react-redux";
import bcrypt from 'bcryptjs';
//icon
import { FaUserAstronaut, FaMapLocationDot } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { toastError, toastSuccess, toastWarning } from "../Toast/Toast";

import { useDispatch } from "react-redux";
import { changeData } from "../../srcRedux/features/customerSlice";
import { useNavigate } from "react-router-dom";
import { convertImageByte } from "../../utils/Utils";

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
    const [address, setAddress] = useState('')
    const [image, setImage] = useState(null)

    const [newPass, setNewPass] = useState('')
    const [reNewPass, setReNewPass] = useState('')

    const [showCancel, setShowCancel] = useState(false)
    const [tab, setTab] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const inputImgRef = useRef(null)

    useEffect(() => {
        if (customerData) {
            setFirstName(customerData.firstName)
            setLastName(customerData.lastName)
            setPhoneNumber(customerData.phoneNumber)
            setEmail(customerData.email)
            setUsername(customerData.username)
            setAddress(customerData.address)
            setImage(customerData.image)
        }
        else {
            navigate('/')
        }

    }, [])

    useEffect(() => {
        if (customerData.firstName !== firstName ||
            customerData.lastName !== lastName ||
            customerData.email !== email ||
            customerData.phoneNumber !== phoneNumber ||
            customerData.address !== address ||
            customerData.image !== image) {
            setShowCancel(true)
        }
        else {
            setShowCancel(false)
        }
    }, [firstName, lastName, email, phoneNumber, image, address])

    const handleResetData = () => {
        setFirstName(customerData.firstName)
        setLastName(customerData.lastName)
        setPhoneNumber(customerData.phoneNumber)
        setEmail(customerData.email)
        setUsername(customerData.username)
        setAddress(customerData.address)
        setImage(customerData.image)
    }

    const handleChangeTab = (tab) => {
        handleResetData()
        setTab(tab)
    }

    //cho tab 1
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
                status: "Đang hoạt động",
                address: customerData.address,
                image: image
            });
            const dataAfterChange = await getCustomerApi(customerData.idCustomer);
            dispatch(changeData({
                customerData: dataAfterChange.data,
            }));
            setShowCancel(false)
            toastSuccess('Thay đổi thông tin thành công', 'top-center');
        } catch (e) {
            console.error('Error:', e);
            toastError(`Lỗi: ${e.message}`, 'top-center');
        }
    };

    const handleChangePass = async () => {
        if (password === '' || newPass === '' || reNewPass === '') {
            toastWarning('Vui lòng nhập đầy đủ thông tin', 'top-center');
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, customerData.password);
        if (!isPasswordMatch) {
            toastWarning('Mật khẩu cũ không chính xác', 'top-center');
            return;
        }

        if (newPass === password) {
            toastWarning('Mật khẩu mới không được giống mật khẩu cũ', 'top-center');
            return;
        }

        if (newPass !== reNewPass) {
            toastWarning('Xác nhận mật khẩu không khớp', 'top-center');
            return;
        }

        try {
            await updateCustomerApi(customerData.idCustomer, {
                firstName: customerData.firstName,
                lastName: customerData.lastName,
                fullName: customerData.fullName,
                dateOfBirth: customerData.dateOfBirth,
                gender: customerData.gender,
                email: customerData.email,
                phoneNumber: customerData.phoneNumber,
                username: customerData.username,
                password: reNewPass,
                status: "Đang hoạt động",
                address: customerData.address,
                image: customerData.image
            });

            const dataAfterChange = await getCustomerApi(customerData.idCustomer);
            dispatch(changeData({
                customerData: dataAfterChange.data,
            }));

            toastSuccess('Đổi mật khẩu thành công', 'top-center');
            setPassword('');
            setNewPass('');
            setReNewPass('');
            setTab(1);
        } catch (e) {
            console.error('Error:', e);
            toastError(`Lỗi: ${e.message}`, 'top-center');
        }
    };
    //cho tab 3
    const handleSaveChangeAddress = async () => {
        try {
            await updateCustomerApi(customerData.idCustomer, {
                firstName: customerData.firstName,
                lastName: customerData.lastName,
                fullName: customerData.fullName,
                dateOfBirth: customerData.dateOfBirth,
                gender: customerData.gender,
                email: customerData.email,
                phoneNumber: customerData.phoneNumber,
                username: customerData.username,
                password: customerData.password,
                status: customerData.status,
                address: address,
                image: customerData.image
            });
            const dataAfterChange = await getCustomerApi(customerData.idCustomer);
            dispatch(changeData({
                customerData: dataAfterChange.data,
            }));
            setShowCancel(false)
            toastSuccess('Thay đổi thông tin thành công', 'top-center');
        } catch (e) {
            console.error('Error:', e);
            toastError(`Lỗi: ${e.message}`, 'top-center');
        }
    };

    const handlePickImage = () => {
        if(tab === 1) {
            inputImgRef.current.click();
        }
        
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result.split(',')[1]);
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            {customerData &&
                <div className="Profile">
                    <div className="col-1">

                        <div className="card-image" onClick={handlePickImage}>
                            <img className="avatar" src={convertImageByte(image)} />
                            <input
                                type="file"
                                accept="image/*"
                                ref={inputImgRef}
                                onChange={handleImageChange}
                            />
                        </div>

                        <h3 className="name">{customerData?.fullName}</h3>
                        <div className="card-feature">
                            <div className="feature" onClick={() => handleChangeTab(1)}>
                                <p>Thông tin cá nhân</p>
                                <FaUserAstronaut className="icon" />
                            </div>
                            <div className="feature" onClick={() => handleChangeTab(2)}>
                                <p>Đổi mật khẩu</p>
                                <IoMdLock className="icon" />
                            </div>
                            <div className="feature" onClick={() => handleChangeTab(3)}>
                                <p>Địa chỉ giao hàng</p>
                                <FaMapLocationDot className="icon" />
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        {tab === 1 &&
                            <>
                                <div className="header">
                                    <h3 className="title">Thông tin cá nhân</h3>
                                    <TiDelete className="btn-delete" onClick={() => toastWarning('Tính năng đang phát triển')} />
                                </div>


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
                                            <input type="text" value={username ? username : ''} disabled />
                                        </div>
                                    </div>

                                    <div className="wrap-input">
                                        <p className="label">Mật khẩu</p>
                                        <div className="input-box">
                                            <input type="password" value={'*********'} disabled />
                                        </div>
                                    </div>
                                </div>


                                <div className="wrap-btn">
                                    {showCancel && <button className="btn-cancel" onClick={handleResetData}>Hủy thay đổi</button>}

                                    <button className="btn-save" onClick={handleSaveChangeData} disabled={!showCancel}>Lưu</button>
                                </div>
                            </>
                        }

                        {tab === 2 &&
                            <>
                                <h3 className="title">Đổi mật khẩu</h3>

                                <div className="wrap-all-input">
                                    <div className="wrap-input full-width">
                                        <p className="label">Mật khẩu cũ</p>
                                        <div className="input-box">
                                            <input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                                        </div>
                                    </div>

                                    <div className="wrap-input full-width">
                                        <p className="label">Mật khẩu mới</p>
                                        <div className="input-box">
                                            <input type="password" value={newPass} onChange={(event) => { setNewPass(event.target.value) }} />
                                        </div>
                                    </div>

                                    <div className="wrap-input full-width">
                                        <p className="label">Xác nhận mật khẩu mới</p>
                                        <div className="input-box">
                                            <input type="password" value={reNewPass} onChange={(event) => { setReNewPass(event.target.value) }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="wrap-btn">
                                    <button className="btn-save" onClick={handleChangePass}>Lưu</button>
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
                                            <input type="text" value={address} onChange={(event) => { setAddress(event.target.value) }} />
                                        </div>
                                    </div>

                                </div>

                                <div className="wrap-btn float-left">
                                {showCancel && <button className="btn-cancel" onClick={handleResetData}>Hủy thay đổi</button>}
                                    <button className="btn-save" onClick={handleSaveChangeAddress} disabled={!showCancel}>Lưu</button>
                                </div>
                            </>
                        }
                    </div>
                </div >
            }
        </>
    )
}

export default Profile