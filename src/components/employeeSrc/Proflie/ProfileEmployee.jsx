import React, { useEffect, useRef, useState } from "react";
import './ProfileEmployee.scss'
import { convertImageByte } from "../../../utils/Utils";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import ChangePass from "../changePass/ChangePass";
import { updateEmployeeApi, updateEmployeeNoPassApi } from "../../../apis/apiLoginEmployee";
import { toastError, toastSuccess } from "../../Toast/Toast";
import { images } from '../../../constants'
import { useDispatch } from "react-redux";
import { changeData } from "../../../srcRedux/features/employeeSlice";

function ProfileEmployee({ employee }) {
    const dispatch = useDispatch()
    const [dataEmployee, setDataEmployee] = useState({
        idEmployee: "",
        idRole: 3,
        firstName: "",
        lastName: "",
        fullName: "",
        idCard: "",
        dateOfBirth: null,
        gender: "",
        email: "",
        phoneNumber: "",
        degree: "",
        address: "",
        joinDate: null,
        imageEmployee: null,
        nameWard: null,
        nameDistrict: null,
        nameProvince: null,
        username: "",
        password: "",
        status: "Đang hoạt động"
    })

    const [showModalChangePass, setShowModalChangePass] = useState(false)

    const inputImgRef = useRef(null)

    useEffect(() => {
        setDataEmployee(employee)
    }, [employee])

    const handleOnChance = (key, value) => {
        let temp = { ...dataEmployee }
        temp[key] = value
        setDataEmployee(temp)
    }

    const handlePickImage = () => {
        inputImgRef.current.click();
    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            // setDataEmployee({ ...dataEmployee, imageEmployee: reader.result.split(',')[1] }); //lưu base 64
            const newEmployee = { ...dataEmployee, imageEmployee: reader.result.split(',')[1] }
            //call api update ltai day lun
            try {
                await updateEmployeeNoPassApi(dataEmployee?.idEmployee, newEmployee)
                dispatch(changeData({
                    employeeData: newEmployee
                }));
                toastSuccess('Cập nhật ảnh đại diện thành công')

            }
            catch (e) {
                toastError(`Lỗi khi cập nhật avatar: ${e}`)
            }
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    return (
        <div className="ProfileEmployee">
            <div className="row-profile ">
                <p className="text-header">Thông tin cá nhân</p>
                <div className="wrap-avatar-name">
                    <img src={dataEmployee?.imageEmployee ? convertImageByte(dataEmployee?.imageEmployee) : images.avatarnull} onClick={handlePickImage} />
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputImgRef}
                        onChange={handleImageChange}
                        hidden
                    />
                    <div className="wrap-name">
                        <p className="name">{employee?.fullName}</p>
                        <p className="role">Nghiên cứu viên</p>
                    </div>
                </div>
                <div className="card-profile">
                    <div className="col-header">
                        <p>Email:</p>
                        <p>Số điện thoại:</p>
                        <p>Tên đăng nhập:</p>
                        <p>Mật khẩu:</p>
                    </div>
                    <div className="col-content">
                        <div className="input-box">
                            <input className="input-text" type="text" value={dataEmployee.email} onChange={(event) => handleOnChance("phoneNumber", event.target.value)} disabled />
                        </div>
                        <div className="input-box">
                            <input className="input-text" type="text" value={dataEmployee.phoneNumber} onChange={(event) => handleOnChance("phoneNumber", event.target.value)} disabled />
                        </div>
                        <div className="input-box">
                            <input className="input-text" type="text" value={dataEmployee.username} onChange={(event) => handleOnChance("username", event.target.value)} disabled />
                        </div>
                        <div className="input-box">
                            <input className="input-text" type="password" value="********" onChange={(event) => handleOnChance("password", event.target.value)} disabled />
                        </div>

                        <div className="btn-change-pass" onClick={() => setShowModalChangePass(true)}>
                            <MdOutlinePublishedWithChanges className="icon-change-pass" />
                            <p>Đổi mật khẩu</p>
                        </div>

                        {showModalChangePass && <ChangePass employee={employee} handleCloseModal={() => setShowModalChangePass(false)} />}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileEmployee