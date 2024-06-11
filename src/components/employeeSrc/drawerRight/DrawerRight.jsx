import React, { useState } from "react";
import './DrawerRight.scss'
import { useDispatch } from "react-redux";
import { logout } from "../../../srcRedux/features/employeeSlice";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const DrawerRight = ({ handleCloseDrawerRight, setScreenName }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/Employee')
        alert('Đăng xuất thành công')
    };

    const handleShowProfile = () => {
        handleCloseDrawerRight()
        setScreenName("profile");
    }
    return (
        <div className="DrawerRight">
            <div className="col-right">
                <div className="row-1">
                    <div className="wrap-header">
                        <p>Thông tin cá nhân</p>
                        <IoMdClose className="icon-close" onClick={handleCloseDrawerRight} />
                    </div>

                    <div className="wrap-avatar-name">
                        <img src="https://i.pinimg.com/564x/40/96/8c/40968c12dce5289c3341131eaf03db19.jpg" />
                        <div className="wrap-name">
                            <p className="name">Huỳnh Khánh Duy</p>
                            <p className="role">Nghiên cứu viên</p>
                        </div>
                    </div>

                    <div className="wrap-btn-feature">
                        <button className="btn-account" onClick={handleShowProfile}>Quản lý tài khoản</button>
                        <button className="btn-logout" onClick={handleLogout}>Đăng xuất</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrawerRight