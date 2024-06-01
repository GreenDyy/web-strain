import React from "react";
import './Drawer.scss'
import { icons } from "../../../constants";
import { useNavigate } from "react-router-dom";

const features = [
    {
        id: 1,
        name: 'Quản lý dự án',
        screenName: 'project'
    },
    {
        id: 2,
        name: 'Quản lý công việc',
        screenName: 'projectContent'
    },
    {
        id: 3,
        name: 'Task',
        screenName: 'contentWork'
    },
    {
        id: 4,
        name: 'Strain của tôi',
        screenName: 'strainManament'
    },
]
const Drawer = ({ setScreenName }) => {
    const handleButtonClick = (screenName) => {
        setScreenName(screenName);
    };
    return (
        <div className="Drawer">
            <div className="header">
                <img src={icons.logo} className="logo" />
            </div>
            <div className="wrap-all-btn">
                {features.map((item) => {
                    return (
                        <button key={item.id} onClick={() => handleButtonClick(item.screenName)}>
                            {item.name}
                        </button>)
                })}
            </div>

        </div>
    )
}

export default Drawer