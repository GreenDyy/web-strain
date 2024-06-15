import React, { useEffect, useRef, useState } from "react";
import './DetailWork.scss'
import { getProjectContentApi, getProjecttApi, updateContentWorkApi, updateFileSavedApi } from "../../../apis/apiTask";
import { FaCircleDot } from "react-icons/fa6";
import moment from "moment";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoDocumentAttachOutline } from "react-icons/io5";
import { toastError, toastSuccess } from "../../Toast/Toast";
import { base64ToBlob } from "../../../utils/Utils";

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
                setNotification(item?.notificattion)
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

    const inputFileRef = useRef(null)

    const handleOpenFile = () => {
        inputFileRef.current.click();
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
            const fileSaved = reader.result.split(',')[1]
            try {
                // Lưu file vào csdl sau khi đã đọc và chuyển đổi xong
                const newWork = { ...dataWork, fileSaved: fileSaved, fileName: file.name };
                // const file = { fileSaved: fileSaved, fileName: fileName };
                await updateFileSavedApi(dataWork.idContentWork, { fileSave: fileSaved, fileName: file.name });
                setDataWork(newWork);
                toastSuccess('Tải file lên thành công');
            }
            catch {
                toastError('Tải file thất bại')
            }

        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    const handleDeleteFile = async () => {
        const newWork = { ...dataWork, fileSaved: null, fileName: null };
        const file = { fileSave: null, fileName: null };
        await updateFileSavedApi(dataWork.idContentWork, file);
        setDataWork(newWork);
    }

    const handleChangeStatusWork = async (status, endDateActual) => {
        const newWork = { ...dataWork, status: status, endDateActual: endDateActual };
        await updateContentWorkApi(dataWork.idContentWork, newWork);
        updateWorkStatus(dataWork.idContentWork, status);
        setDataWork(newWork);
        setShowDropdown(false);
    }

    const handleSaveDes = async () => {
        try {
            const newWork = { ...dataWork, notificattion: notification };
            await updateContentWorkApi(dataWork.idContentWork, newWork);
            setDataWork(newWork);
            toastSuccess('Đã lưu mô tả')
        }
        catch {
            toastError('Cập nhật mô tả thất bại')
        }
    }

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
                                    <div className="wrap-actual-end-date">
                                        <p>NGÀY HOÀN THÀNH</p>
                                        <small>{dataWork?.endDateActual}</small>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="wrap-2">
                            <div className="title-and-save">
                                <h3 className="title-notification">MÔ TẢ CÔNG VIỆC</h3>
                                <button className="btn-save" onClick={handleSaveDes}>Lưu mô tả công việc</button>
                            </div>

                            <ReactQuill theme="snow"
                                className="editor-container"
                                value={notification}
                                onChange={setNotification}
                            />
                        </div>

                    </div>

                    <div className="col-2">
                        <div className="wrap-attach">
                            <p>TÀI LIỆU ĐÍNH KÈM</p>
                            <div className="btn-attach" onClick={handleOpenFile}>
                                <IoDocumentAttachOutline className="icon-attach" />
                                <p className="title-btn-attach">Thêm tài liệu</p>
                            </div>
                        </div>
                        <div className="area-attach">
                            {dataWork?.fileName ? (
                                <div className="file-info">
                                    <p>
                                        Tên tệp:
                                        {dataWork?.fileSaved && (
                                            <a href={URL.createObjectURL(base64ToBlob(dataWork?.fileSaved, 'application/octet-stream'))} download={dataWork.fileName}>
                                                {dataWork.fileName}
                                            </a>
                                        )}
                                    </p>
                                    <p>Kích thước: {(base64ToBlob(dataWork?.fileSaved, 'application/octet-stream')?.size / 1024).toFixed(2)} KB</p>
                                    {/* <button className="btn-delete-file" onClick={handleDeleteFile}>Xoá tài liệu</button> */}
                                </div>

                            ) : (
                                <p className="no-attach-file">Không có tài liệu đính kèm</p>
                            )}
                            <input ref={inputFileRef} type="file" onChange={handleFileChange} hidden />
                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default DetailWork
