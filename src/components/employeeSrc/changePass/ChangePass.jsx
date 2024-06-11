import React, { useState } from "react";
import './ChangePass.scss'
import { toastError, toastSuccess, toastWarning } from "../../Toast/Toast";
import bcrypt from 'bcryptjs';
import { updateEmployeeApi } from "../../../apis/apiLoginEmployee";
import { useDispatch } from "react-redux";
import { changeData } from "../../../srcRedux/features/employeeSlice";

function ChangePass({ employee, handleCloseModal }) {
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [reNewPass, setReNewPass] = useState('')
    const dispatch = useDispatch()

    const handleChangePass = async () => {
        if (oldPass === '' || newPass === '' || reNewPass === '') {
            toastWarning('Vui lòng nhập đầy đủ thông tin', 'top-center');
            return;
        }

        const isPasswordMatch = await bcrypt.compare(oldPass, employee?.password);
        if (!isPasswordMatch) {
            toastWarning('Mật khẩu cũ không chính xác', 'top-center');
            return;
        }

        if (newPass === oldPass) {
            toastWarning('Mật khẩu mới không được giống mật khẩu cũ', 'top-center');
            return;
        }

        if (newPass !== reNewPass) {
            toastWarning('Xác nhận mật khẩu không khớp', 'top-center');
            return;
        }
        try {
            const dataAfterChange = { ...employee, password: reNewPass }
            await updateEmployeeApi(employee?.idEmployee, dataAfterChange)
            dispatch(changeData({
                employeeData: dataAfterChange
            }));
            toastSuccess('Đổi mật khẩu thành công')
            handleCloseModal()
        }
        catch {
            toastError('Lỗi')
        }

    }

    return (
        < div className="ChangePass" >
            <form className="form-change-pass">
                <div className="header-title">
                    <h2 className="title-work">Đổi mật khẩu</h2>
                    <button className="btn-back" onClick={handleCloseModal}>Quay lại</button>
                </div>

                <div className="wrap-all-input">
                    <div className="input-box1">
                        <input className="input-text1" type="password" placeholder="Nhập mật khẩu cũ" value={oldPass} onChange={(e) => setOldPass(e.target.value)} required />
                    </div>
                    <div className="input-box1">
                        <input className="input-text1" type="password" placeholder="Nhập mật khẩu mới" value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
                    </div>
                    <div className="input-box1">
                        <input className="input-text1" type="password" placeholder="Nhập lại mật khẩu mới" value={reNewPass} onChange={(e) => setReNewPass(e.target.value)} required />
                    </div>
                </div>

                <button className="btn-submit" type="button" onClick={handleChangePass}>Đổi mật khẩu</button>

            </form>
        </div >
    )
}

export default ChangePass