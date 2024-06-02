import React, { useEffect, useState } from "react";
import './StrainManament.scss'
import { getAllStrainByTheEmployee } from "../../../apis/apiStrain";
import { images } from "../../../constants";
import { convertImageByte } from "../../../utils/Utils";
import { MdOutlineWorkHistory, MdOutlineWorkOff, MdOutlineWorkspacePremium } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import StrainAdd from "../strainUpload/StrainAdd";

function StrainManament() {
    const [strains, setStrains] = useState([])
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const strains = await getAllStrainByTheEmployee('NV002')
            setStrains(strains.data)
        }
        fetchData()
    }, [])
    console.log(strains)

    return (
        <div className="StrainManament">

            <div className="row-statistical">
                <p className="text-header">Thống kê các chủng</p>
                <div className="wrap-all-statistical">

                    <div className="o-box o-1" >
                        <p className="title">Tất cả các chủng</p>
                        <div className="wrap-quantity">
                            <p className="quantity">2</p>
                            <MdOutlineWorkOff className="icon-work" />
                        </div>
                    </div>

                    <div className="o-box o-2">
                        <p className="title">Chủng đã duyệt</p>
                        <div className="wrap-quantity">
                            <p className="quantity">2</p>
                            <MdOutlineWorkspacePremium className="icon-work" />
                        </div>
                    </div>

                    <div className="o-box o-3" >
                        <p className="title">Chủng đang chờ xét duyệt</p>
                        <div className="wrap-quantity">
                            <p className="quantity">2</p>
                            <MdOutlineWorkHistory className="icon-work" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="row-2">
                <p className="text-header">Các strain của tôi</p>
                <div className="wrap-all-item">
                    {strains?.map((item, index) => {
                        const imageSrc = item?.imageStrain ? convertImageByte(item?.imageStrain) : images.strainnull
                        return (
                            <div key={index} className="wrap-item">
                                <div className="card-img">
                                    <img src={imageSrc} className="img-strain" />
                                </div>
                                <div className="card-text">
                                    <p className="name">{item?.scientificName}</p>
                                    <p className="number">
                                        <strong style={{ color: 'black' }}>
                                            Number:
                                        </strong> {item?.strainNumber ? item.strainNumber : "Chưa có mã"}
                                    </p>
                                    <p className="number">
                                        <strong style={{ color: 'black' }}>
                                            Ngày thêm:
                                        </strong> {item?.dateAdd}
                                    </p>
                                    <div className={`${item?.strainApprovalHistories[0]?.status === 'Đã được duyệt' ? 'da-duyet' : 'chua-duyet'}`}>

                                        {item?.strainApprovalHistories[0]?.status}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

            <IoMdAddCircle className="float-btn" onClick={()=>setShowModal(true)}/>
            {showModal && (
                <StrainAdd handleCloseModal={()=>setShowModal(false)}/>
            )}
        </div>
    )
}
export default StrainManament