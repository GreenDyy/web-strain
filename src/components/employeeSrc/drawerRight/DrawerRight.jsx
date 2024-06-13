import React, { useState } from "react";
import './DrawerRight.scss'
import { useDispatch } from "react-redux";
import { logout } from "../../../srcRedux/features/employeeSlice";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { convertImageByte } from "../../../utils/Utils";
import { images } from "../../../constants";

const DrawerRight = ({ handleCloseDrawerRight, setScreenName, employee }) => {
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
                        <img src={employee?.imageEmployee ? convertImageByte(employee?.imageEmployee) : images.avatarnull} />
                        <div className="wrap-name">
                            <p className="name">{employee?.fullName}</p>
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