import React, { useEffect, useState } from "react";
import './StrainManament.scss'
import { getAllStrainByTheEmployee, getStrainByIdApi } from "../../../apis/apiStrain";
import { images } from "../../../constants";
import { convertImageByte } from "../../../utils/Utils";
import { MdOutlineWorkHistory, MdOutlineWorkOff, MdOutlineWorkspacePremium } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import StrainModal from "../strainUpload/StrainModal";

const ItemStrain = ({ item, onHandleDetail }) => {
    const imageSrc = item?.imageStrain ? convertImageByte(item?.imageStrain) : images.strainnull
    return (
        <div className="wrap-item" onClick={() => onHandleDetail(item?.idStrain)}>
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
}



function StrainManament({ employee }) {
    const [strains, setStrains] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [daDuyet, setDaDuyet] = useState(0)
    const [chuaDuyet, setChuaDuyet] = useState(0)
    const [dataType, setDataType] = useState(1)
    const [strain, setStrain] = useState(null)

    const fetchStrains = async () => {
        const response = await getAllStrainByTheEmployee(employee?.idEmployee);
        setStrains(response.data);
    }

    useEffect(() => {
        fetchStrains();
    }, []);

    useEffect(() => {
        setDaDuyet(strains.filter(s => s.strainNumber !== null).length)
        setChuaDuyet(strains.filter(s => s.strainNumber === null).length)
    }, [strains])

    const onHandleDetail = async (idStrain) => {
        const strain = await getStrainByIdApi(idStrain);
        setStrain(strain.data)
        setShowModal(true)
        window.scrollTo({ top: 0 })
    }

    const handleOpenModalStrain = () => {
        setShowModal(true)
        setStrain(null)
        window.scrollTo({ top: 0 })
    }

    const handleDataUpdated = () => {
        fetchStrains();
    }

    return (
        <div className="StrainManament">

            <div className="row-statistical">
                <p className="text-header">Thống kê các chủng</p>
                <div className="wrap-all-statistical">

                    <div className="o-box o-1" onClick={() => { setDataType(1) }}>
                        <p className="title">Tất cả các chủng</p>
                        <div className="wrap-quantity">
                            <p className="quantity">{strains?.length}</p>
                            <MdOutlineWorkOff className="icon-work" />
                        </div>
                    </div>

                    <div className="o-box o-2" onClick={() => { setDataType(2) }}>
                        <p className="title">Chủng đã duyệt</p>
                        <div className="wrap-quantity">
                            <p className="quantity">{daDuyet}</p>
                            <MdOutlineWorkspacePremium className="icon-work" />
                        </div>
                    </div>

                    <div className="o-box o-3" onClick={() => { setDataType(3) }}>
                        <p className="title">Chủng đang chờ xét duyệt</p>
                        <div className="wrap-quantity">
                            <p className="quantity">{chuaDuyet}</p>
                            <MdOutlineWorkHistory className="icon-work" />
                        </div>
                    </div>

                    <IoMdAddCircle className="add-top" onClick={handleOpenModalStrain} />

                </div>
            </div>

            <div className="row-2">
                <p className="text-header">Các chủng bạn đã thêm</p>
                <div className="wrap-all-item">
                    {dataType === 1 &&
                        strains?.map((item, index) => {
                            return (
                                <ItemStrain key={index} item={item}
                                    onHandleDetail={onHandleDetail}
                                />
                            )
                        })
                    }
                    {dataType === 2 &&
                        strains?.filter(s => s.strainNumber !== null).map((item, index) => {
                            return (
                                <ItemStrain key={index} item={item}
                                    onHandleDetail={onHandleDetail}
                                />
                            )
                        })
                    }
                    {dataType === 3 &&
                        strains?.filter(s => s.strainNumber === null).map((item, index) => {
                            return (
                                <ItemStrain key={index} item={item}
                                    onHandleDetail={onHandleDetail}
                                />
                            )
                        })
                    }
                </div>

            </div>

            <IoMdAddCircle className="float-btn" onClick={handleOpenModalStrain} />
            {showModal && (
                <StrainModal handleCloseModal={() => setShowModal(false)} strain={strain} employee={employee} onUpdateData={handleDataUpdated} />
            )}
        </div>
    )
}
export default StrainManament