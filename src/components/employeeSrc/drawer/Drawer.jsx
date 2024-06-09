import React, { useState } from "react";
import './Drawer.scss'
import { icons } from "../../../constants";
import { setDataLocalStorage } from "../../../utils/Utils";

const features = [
    {
        id: 1,
        name: 'Công việc của tôi',
        screenName: 'contentWork',
        icon: icons.work
    },
    {
        id: 2,
        name: 'Quản lý chủng',
        screenName: 'strainManament',
        icon: icons.strain
    },
    {
        id: 3,
        name: 'Tìm chủng',
        screenName: 'allStrain',
        icon: icons.strain
    },
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