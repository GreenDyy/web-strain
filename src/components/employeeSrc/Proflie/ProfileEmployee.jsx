import React, { useEffect, useRef, useState } from "react";
import './ProfileEmployee.scss'
import { convertImageByte } from "../../../utils/Utils";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import ChangePass from "../changePass/ChangePass";

function ProfileEmployee({ employee }) {
    const [dataEmployee, setDataEmployee] = useState({
        idEmployee: "NV010",
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
    }, [])

    const handleOnChance = (key, value) => {
        let temp = { ...dataEmployee }
        temp[key] = value
        setDataEmployee(temp)
    }

    const handlePickImage = () => {
        inputImgRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setDataEmployee({ ...dataEmployee, imageEmployee: reader.result.split(',')[1] }); //lưu base 64
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
                    <img src={convertImageByte(dataEmployee?.imageEmployee)} onClick={handlePickImage} />
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