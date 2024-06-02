import React, { useEffect, useRef, useState } from "react";
import './DetailWork.scss'
import { getProjectContentApi, getProjecttApi, updateContentWorkApi } from "../../../apis/apiTask";
import { FaCircleDot } from "react-icons/fa6";
import moment from "moment";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DetailWork = ({ item, handleCloseModal, updateWorkStatus }) => {
    const [dataWork, setDataWork] = useState(null)
    const [project, setProject] = useState(null)
    const [projectContent, setProjectContent] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const [notification, setNotification] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            if (item) {
                setDataWork(item)
                const projectContent = await getProjectContentApi(item.idProjectContent);
                const project = await getProjecttApi(projectContent.data.idProject);
                setProjectContent(projectContent.data);
                setProject(project.data);
            }
        };
        fetchData();
    }, [item]);

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
        const newWork = { ...dataWork, status: status, endDateActual: endDateActual };
        await updateContentWorkApi(dataWork.idContentWork, newWork);
        updateWorkStatus(dataWork.idContentWork, status);
        setDataWork(newWork);
        setShowDropdown(false);
    }
    console.log(notification)
    return (
        <div className="DetailWork">
            <div className="modal">
                <div className="header-title">
                    <h2 className="title-work">Chi tiết công việc</h2>
                    <button className="btn-back" onClick={handleCloseModal}>Quay lại</button>
                </div>

                <div className="row-body">
                    <div className="col-1">
                        <p className="title-project">{project?.idProject} / {projectContent?.nameContent}</p>
                        <p className="title-work">{dataWork?.nameContent}</p>

                        <div className="wrap-1">
                            <button className={`${dataWork?.status === 'Chưa hoàn thành' ? 'not-complete' : 'complete'}`} onClick={() => setShowDropdown(!showDropdown)}>{dataWork?.status}</button>
                            {showDropdown &&
                                <div className='wrap-dropdown' ref={dropdownRef}>
                                    <div className='wrap-item-drop' onClick={() => { handleChangeStatusWork("Chưa hoàn thành", null) }}>
                                        <FaCircleDot className='icon-drop' />
                                        <p className='text-drop'>Chưa hoàn thành</p>
                                    </div>

                                    <div className='wrap-item-drop' onClick={() => { handleChangeStatusWork("Đã hoàn thành", moment().format('YYYY-MM-DD')) }}>
                                        <FaCircleDot className='icon-drop-2' />
                                        <p className='text-drop-2'>Đã hoàn thành</p>
                                    </div>
                                </div>
                            }
                            <div className="wrap-priority">
                                <p className="title-priority">Mức độ ưu tiên:</p>
                                <p className="text-priority">{dataWork?.priority}</p>
                            </div>

                            <div className="wrap-all-date">
                                <div className="wrap-start-date">
                                    <p>NGÀY BẮT ĐẦU</p>
                                    <small>{dataWork?.startDate}</small>
                                </div>
                                <div className="wrap-end-date">
                                    <p>HẠN CHÓT</p>
                                    <small>{dataWork?.endDate}</small>
                                </div>
                                {dataWork?.endDateActual && (
                                    <div div className="wrap-actual-end-date">
                                        <p>NGÀY HOÀN THÀNH</p>
                                        <small>{dataWork?.endDateActual}</small>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="wrap-2">
                            <div className="title-and-save">
                                <h3 className="title-notification">NOTIFICATION</h3>
                                <button className="btn-save">Lưu mô tả</button>
                            </div>

                            <ReactQuill theme="snow"
                                className="editor-container"
                                value={notification}
                                onChange={setNotification}
                            />
                        </div>

                    </div>

                    <div className="col-2">
                        <p>tài liệu here</p>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default DetailWork