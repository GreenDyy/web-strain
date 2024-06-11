import React, { useState } from "react";
import './ProfileEmployee.scss'
import { convertImageByte } from "../../../utils/Utils";

function ProfileEmployee() {
    const [tab, setTab] = useState(1)
    const handleChangeTab = (tab) => {
        // handleResetData()
        setTab(tab)
    }
    return (
        <div className="ProfileEmployee">
            <p>a</p>
            {/* <div className="col-1">

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
                    <div className="feature" onClick={() => toastSuccess('Tính năng đang phát triển')}>
                        <p>Xóa tài khoản</p>
                        <TiDelete className="icon" style={{ fontSize: 20 }} />
                    </div>
                </div>
            </div>

            <div className="col-2">
                {tab === 1 &&
                    <>
                        <div className="header">
                            <h3 className="title">Thông tin cá nhân</h3>
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
            </div> */}
        </div >
    )
}

export default ProfileEmployee