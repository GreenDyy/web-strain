import React, { useState } from "react";
import './Drawer.scss'
import { icons } from "../../../constants";
import { FaViruses } from "react-icons/fa6";
import { setDataLocalStorage } from "../../../utils/Utils";

const features = [
    {
        id: 1,
        name: 'Quản lý công việc',
        screenName: 'contentWork',
        icon: icons.work
    },
    {
        id: 2,
        name: 'Quản lý Strain',
        screenName: 'strainManament',
        icon: icons.strain
    },
    // {
    //     id: 3,
    //     name: 'Task',
    //     screenName: 'contentWork'
    // },
    // {
    //     id: 4,
    //     name: 'Strain của tôi',
    //     screenName: 'strainManament'
    // },
]
const Drawer = ({ setScreenName }) => {
    const [btnSelect, setBtnSelected] = useState(null)

    const handleButtonClick = (id, screenName) => {
        setBtnSelected(id)
        setDataLocalStorage('screenNameOfDrawer', screenName)
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
                        <button className={`btn-drawer ${item.id === btnSelect ? 'btn-selected' : ''}`} key={item.id} onClick={() => handleButtonClick(item.id, item.screenName)}>
                            <img src={item.icon} className="icon" />
                            <p> {item.name} </p>
                        </button>)
                })}
            </div>

        </div>
    )
}

export default Drawer