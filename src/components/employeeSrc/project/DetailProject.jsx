import React from 'react'
import './DetailProject.scss'
import { convertImageByte } from '../../../utils/Utils'
import { images } from '../../../constants'

const ItemEmployee = ({ employee }) => {
    return (
        <div className="wrap-avatar-name">
            <img src={employee?.imageEmployee ? convertImageByte(employee?.imageEmployee) : images.avatarnull} />
            <div className="wrap-name-nav">
                <p className="name">{employee?.fullName}</p>
                <p className={`role ${employee?.idRole === 1 && 'red-role'} ${employee?.idRole === 3 && 'green-role'}`}>{employee?.roleName}</p>
            </div>

        </div>
    )
}

function DetailProject({ title, item, handleCloseModal }) {
    console.log(item)
    return (
        <div className='DetailProject'>
            <div className="modal">
                <div className="header-title">
                    <p className="title-work"><strong>Dự án:</strong> {title ? title : ""}</p>
                    {/* <h2 className="title-work">Các thành viên tham gia</h2> */}
                    <button className="btn-back" onClick={handleCloseModal}>Quay lại</button>
                </div>

                <div className="row-body">
                    <h2 className="title-work" style={{margin:0}}>Các thành viên tham gia</h2>
                    {item?.map((item, index) => {
                        return (
                            <ItemEmployee key={index} employee={item} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DetailProject