import React, { useEffect, useState, useRef } from "react";
import './ContentWork.scss'
import { MdOutlineWorkHistory, MdOutlineWorkspacePremium, MdOutlineWorkOff } from "react-icons/md";
import { FaFirefoxBrowser } from "react-icons/fa";
import { getAllContentWorkApi, getContentWorkApi, updateContentWorkApi } from '../../../apis/apiTask'
import { FaCircleDot, FaFlag } from "react-icons/fa6";
import moment from "moment/moment";
import DetailWork from "../detailWork/DetailWork";

const ItemWork = ({ work, updateWorkStatus, onClick }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleChangeStatusWork = async (status, endDateActual) => {
        const newWork = { ...work, status: status, endDateActual: endDateActual };
        await updateContentWorkApi(work.idContentWork, newWork)
        updateWorkStatus(work.idContentWork, status);
        setShowDropdown(false)
    }
    return (
        <tr>
            <td style={{ width: '50%', padding: '0px 5px' }}>
                <div className='wrap-name-content'>
                    <FaCircleDot className={`${work?.status === 'Chưa hoàn thành' ? 'icon-status-not' : 'icon-status-yes'}`} />
                    <p style={{ paddingRight: 10 }} onClick={() => { onClick(work.idContentWork) }}>{work?.nameContent}</p>
                </div>
            </td>
            <td style={{ width: '10%' }}>{work?.startDate} </td>
            <td style={{ width: '10%' }}>{work?.endDate} </td>
            <td style={{ width: '10%', textAlign: 'center' }}>
                <div className={`wrap-flag ${work?.priority === 'Cao' ? 'high' : 'low'}`}>
                    <FaFlag className='icon-flag' />
                    {work?.priority}
                </div>
            </td>
            <td
                ref={dropdownRef}
                style={{ width: '10%', cursor: 'pointer', position: 'relative' }}
                className={`${work?.status === 'Chưa hoàn thành' ? 'not-complete' : 'complete'}`}
                onClick={() => setShowDropdown(!showDropdown)}>
                {work?.status}
                {showDropdown &&
                    <div className='wrap-dropdown'>
                        <div className='wrap-item-drop' onClick={() => { handleChangeStatusWork("Chưa hoàn thành", null) }}>
                            <FaCircleDot className='icon-drop' />
                            <p className='text-drop'>Chưa hoàn thành</p>
                        </div>

                        <div className='wrap-item-drop' onClick={() => { handleChangeStatusWork("Đã hoàn thành", moment().format('YYYY-MM-DD')) }}>
                            <FaCircleDot className='icon-drop-2' />
                            <p className='text-drop-2'>Đã hoàn thành</p>
                        </div>
                    </div>}
            </td>
        </tr>
    )
}

const prioritys = ['Tất cả', 'Cao', 'Thấp']

function ContentWork({employee}) {
    const [dataContentWork, setDataContentWork] = useState([])
    const [chuaLam, setChuaLam] = useState(0)
    const [hoanThanh, setHoanThanh] = useState(0)
    const [trongHan, setTrongHan] = useState(0)
    const [sapToiHan, setSapToiHan] = useState(0)
    // 1 all 2 chua lam 3 hoan thanh 4 con han 5 sap toi han
    const [dataType, setDataType] = useState(1)
    const [dataModal, setDataModal] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showDropdownPriority, setShowDropdownPriority] = useState(false)
    const [priority, setPriority] = useState('Tất cả')
    const dropdownPriorityRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownPriorityRef.current && !dropdownPriorityRef.current.contains(event.target)) {
                setShowDropdownPriority(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const dataCW = await getAllContentWorkApi(employee.idEmployee)
            setDataContentWork(dataCW.data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        setChuaLam(dataContentWork.filter(cw => cw.status === "Chưa hoàn thành").length)
        setHoanThanh(dataContentWork.filter(cw => cw.status === "Đã hoàn thành").length)
        setTrongHan(dataContentWork.filter(cw => new Date(cw.endDate) > new Date(cw.startDate) && new Date(cw.endDate) > new Date() && cw.status !== "Đã hoàn thành").length)

        setSapToiHan(dataContentWork.filter(cw => {
            const endDate = moment(cw.endDate);
            const differenceInDays = endDate.diff(moment(), 'days');
            return differenceInDays > 0 && differenceInDays <= 1 && differenceInDays <= 1 && cw.status !== 'Đã hoàn thành'
        }).length)
    }, [dataContentWork])

    const updateWorkStatus = (id, newStatus) => {
        setDataContentWork(prevData =>
            prevData.map(work =>
                work.idContentWork === id ? { ...work, status: newStatus } : work
            )
        );
    };
    const handleSetDataMoDal = async (idContentWork) => {
        const response = await getContentWorkApi(idContentWork)
        setDataModal(response.data)
        setShowModal(true)
    }

    const handleSetPriority = (priority) => {
        setPriority(priority)
        setShowDropdownPriority(false)
    }

    return (
        <div className="ContentWork">
            <div className="row-statistical">
                <p className="text-header">Thống kê công việc</p>
                <div className="wrap-all-statistical">

                    <div className="o-box o-5" onClick={() => { setDataType(1) }}>
                        <p className="title">Tất cả công việc</p>
                        <div className="wrap-quantity">
                            <p className="quantity">{dataContentWork.length}</p>
                            <MdOutlineWorkOff className="icon-work" />
                        </div>
                    </div>

                    <div className="o-box o-1" onClick={() => { setDataType(2) }}>
                        <p className="title">Công việc chưa làm</p>
                        <div className="wrap-quantity">
                            <p className="quantity">{chuaLam}</p>
                            <MdOutlineWorkOff className="icon-work" />
                        </div>
                    </div>

                    <div className="o-box o-2" onClick={() => { setDataType(3) }}>
                        <p className="title">Công việc đã hoàn thành</p>
                        <div className="wrap-quantity">
                            <p className="quantity">{hoanThanh}</p>
                            <MdOutlineWorkspacePremium className="icon-work" />
                        </div>
                    </div>

                    <div className="o-box o-3" onClick={() => { setDataType(4) }}>
                        <p className="title">Công việc còn trong hạn</p>
                        <div className="wrap-quantity">
                            <p className="quantity">{trongHan}</p>
                            <MdOutlineWorkHistory className="icon-work" />
                        </div>
                    </div>

                    <div className="o-box o-4" onClick={() => { setDataType(5) }}>
                        <p className="title">Công việc sắp tới hạn</p>
                        <div className="wrap-quantity">
                            <p className="quantity">{sapToiHan}</p>
                            <FaFirefoxBrowser className="icon-work" />
                        </div>
                    </div>

                </div>

            </div>

            <div className="row-work">
                <div className="row-filter">
                    <p className="text-header">Công việc của tôi - Tên dự án</p>
                    {/* //loc trong cai 1 trong 4 the minh ấn thoi, 4 the khac nhau */}
                    <div className="wrap-dropdown-item" ref={dropdownPriorityRef}>
                        <button className="btn-filter" onClick={() => setShowDropdownPriority(!showDropdownPriority)}>Độ ưu tiên: {priority}</button>
                        {showDropdownPriority &&
                            <div className='wrap-dropdown'>
                                {prioritys.map((item, index) => {
                                    return (
                                        <div keu={index} className='wrap-item-drop' onClick={() => { handleSetPriority(item) }}>
                                            <FaCircleDot className='icon-drop' />
                                            <p className='text-drop'>{item}</p>
                                        </div>
                                    )
                                })}
                            </div>}
                    </div>
                </div>

                <div className="row-table">
                    <table className='task-table'>
                        <thead>
                            <tr>
                                <th>Nội dung công việc</th>
                                <th>Ngày BĐ</th>
                                <th>Ngày KT</th>
                                <th>Mức độ ưu tiên</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataType === 1 &&
                                dataContentWork
                                    ?.filter(cw => (priority === "Tất cả" || cw.priority === priority))
                                    .map((item, index) => (
                                        <ItemWork key={index} work={item} updateWorkStatus={updateWorkStatus} onClick={handleSetDataMoDal} />
                                    ))}
                            {dataType === 2 &&
                                dataContentWork
                                    ?.filter(cw => cw.status === "Chưa hoàn thành" && (priority === "Tất cả" || cw.priority === priority))
                                    .map((item, index) => (
                                        <ItemWork key={index} work={item} updateWorkStatus={updateWorkStatus} onClick={handleSetDataMoDal} />
                                    ))}
                            {dataType === 3 &&
                                dataContentWork
                                    ?.filter(cw => cw.status === "Đã hoàn thành" && (priority === "Tất cả" || cw.priority === priority))
                                    .map((item, index) => (
                                        <ItemWork key={index} work={item} updateWorkStatus={updateWorkStatus} onClick={handleSetDataMoDal} />
                                    ))}
                            {dataType === 4 &&
                                dataContentWork
                                    ?.filter(cw => new Date(cw.endDate) > new Date(cw.startDate) && new Date(cw.endDate) > new Date() && cw.status !== "Đã hoàn thành" && (priority === "Tất cả" || cw.priority === priority))
                                    .map((item, index) => (
                                        <ItemWork key={index} work={item} updateWorkStatus={updateWorkStatus} onClick={handleSetDataMoDal} />
                                    ))}
                            {dataType === 5 &&
                                dataContentWork
                                    ?.filter(cw => {
                                        const endDate = moment(cw.endDate);
                                        const differenceInDays = endDate.diff(moment(), 'days');
                                        return differenceInDays > 0 && differenceInDays <= 1 && cw.status !== 'Đã hoàn thành' && (priority === "Tất cả" || cw.priority === priority);
                                    })
                                    .map((item, index) => (
                                        <ItemWork key={index} work={item} updateWorkStatus={updateWorkStatus} onClick={handleSetDataMoDal} />
                                    ))}
                        </tbody>

                    </table>
                    {showModal && (
                        <DetailWork item={dataModal} handleCloseModal={() => { setShowModal(false) }} updateWorkStatus={updateWorkStatus} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContentWork