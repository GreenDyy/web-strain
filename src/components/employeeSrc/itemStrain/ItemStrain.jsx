import React from "react";
import './ItemStrain.scss'
import { convertImageByte, formatDate } from "../../../utils/Utils";
import { images } from "../../../constants";

const ItemStrain = ({ item, onHandleDetail }) => {
    const imageSrc = item?.imageStrain ? convertImageByte(item?.imageStrain) : images.strainnull
    return (
        <div className="wrap-strain" onClick={() => onHandleDetail(item?.idStrain)}>
            <div className="card-img">
                <img src={imageSrc} className="img-strain" />
            </div>
            <div className="card-text">
                <p className="name">{item?.scientificName}</p>
                <p className="number">
                    <strong style={{ color: 'black' }}>
                        Mã:
                    </strong> {item?.strainNumber ? item.strainNumber : "Chưa có mã"}
                </p>
                <p className="number">
                    <strong style={{ color: 'black' }}>
                        Ngày thêm:
                    </strong> {formatDate(item?.dateAdd)}
                </p>
                <div className={`${item?.strainApprovalHistories[0]?.status === 'Đã được duyệt' ? 'da-duyet' : 'chua-duyet'}`}>
                    {item?.strainApprovalHistories[0]?.status}
                </div>
            </div>
        </div>
    )
}
export default ItemStrain