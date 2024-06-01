import React from "react";
import './DetailWork.scss'

const DetailWork = ({ item, handleCloseModal }) => {
    return (
        <div className="DetailWork">
            <div className="modal">
                <div className="header-title">
                    <h2 className="title-work">Chi tiết công việc</h2>
                    <button className="btn-back" onClick={handleCloseModal}>Quay lại</button>
                </div>
                <p>{item.nameContent}</p>
                <p>aaa</p>
            </div>

        </div>
    )
}

export default DetailWork