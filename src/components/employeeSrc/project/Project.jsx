import React, { useEffect, useState } from "react";
import './Project.scss'
import { getAllProjectEmployeeApi } from "../../../apis/apiTask";
import { getEmployeeByIdApi } from "../../../apis/apiLoginEmployee";
import { icons } from "../../../constants";
import { format } from 'date-fns'

const ItemProject = ({ item }) => {
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
                    <img src={icons.project} className="icon-project" />
                    <h3 className="name-project">{item?.projectName}</h3>
                </div>

                <img src={icons.more} className="icon" />
            </div>
            <p className="row-2">Tạo bởi {owner?.fullName} vào ngày {format(item.startDateProject, 'dd-MM-yyyy')}</p>
        </div>
    )
}

function Project({ employee }) {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const projects = await getAllProjectEmployeeApi(employee?.idEmployee)
            setProjects(projects.data)
        }
        fetchData()
    }, [])
    console.log(projects)
    return (
        <div className="Project">
            <p className="text-header">Các dự án tham gia</p>
            <div className="wrap-all-item">
                {projects?.map((item, index) => (
                    <ItemProject key={index} item={item} />
                ))}

            </div>
        </div>
    )
}

export default Project