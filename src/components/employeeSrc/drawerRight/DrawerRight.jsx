import React, { useState } from "react";
import './DrawerRight.scss'
import { useDispatch } from "react-redux";
import { logout } from "../../../srcRedux/features/employeeSlice";
import { useNavigate } from "react-router-dom";

const DrawerRight = ({ handleCloseDrawerRight }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        navigate('/Employee')
        alert('Đăng xuất thành công')
    };
    return (
        <div className="DrawerRight">
            <div className="col-right">
                <button onClick={handleCloseDrawerRight}>x</button>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </div>
    )
}

export default DrawerRight