import React, { useEffect, useState } from "react";
import './Project.scss'
import { getAllEmployeeByIdProjectApi, getAllProjectEmployeeApi } from "../../../apis/apiTask";
import { getEmployeeByIdApi } from "../../../apis/apiLoginEmployee";
import { icons } from "../../../constants";
import { formatDate } from "../../../utils/Utils";
import DetailProject from "./DetailProject";

const ItemProject = ({ item, handleShowDetail }) => {
    const [owner, setOwner] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const owner = await getEmployeeByIdApi(item?.idEmployee)
            setOwner(owner.data)
        }
        fetchData()
    }, [])
    return (
        <div className="item-project">
            <div className="row-1">
                <div className="col-1">
                    <img src={icons.project} className="icon-project" alt="project icon" />
                    <h3 className="name-project">{item?.projectName}</h3>
                </div>

                <img src={icons.more} className="icon" alt="more icon" onClick={() => handleShowDetail(item.idProject)} />
            </div>
            <p className="row-2">Tạo bởi {owner?.fullName} vào ngày {formatDate(item.startDateProject)}</p>
            <p className={`${item?.status === 'Chưa hoàn thành' ? 'status-notcomplete' : 'status-complete'}`}>{item?.status}</p>
        </div>
    )
}

function Project({ employee }) {
    const [projects, setProjects] = useState([])
    const [dataModal, setDataModal] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const projectsData = await getAllProjectEmployeeApi(employee?.idEmployee)
            setProjects(projectsData.data)
        }
        fetchData()
    }, [employee?.idEmployee])

    const handleShowDetail = async (idProject) => {
        const response = await getAllEmployeeByIdProjectApi(idProject)
        setDataModal(response.data)
        setShowModal(true)
    }

    console.log(projects)

    return (
        <div className="Project">
            <p className="text-header">Các dự án tham gia</p>
            <div className="wrap-all-item">
                {projects?.map((item, index) => (
                      <ItemProject key={index} item={item} handleShowDetail={handleShowDetail} handleCloseModal={() => { setShowModal(false) }} />
                ))}

            </div>
            {showModal && (
                <DetailProject item={dataModal} handleCloseModal={() => setShowModal(false)} />
            )}
        </div>
    )
}

export default Project