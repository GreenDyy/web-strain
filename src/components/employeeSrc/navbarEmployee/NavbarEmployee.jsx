import React, { useState } from "react";
import './NavbarEmployee.scss'
import { MdOutlineNotificationsActive } from "react-icons/md";
import DrawerRight from "../drawerRight/DrawerRight";
import { images } from "../../../constants";
import { convertImageByte } from "../../../utils/Utils";

function NavbarEmployee({ employee, setScreenName }) {
    const [showDrawerRight, setShowDrawerRight] = useState(false)
    return (
        <div className="NavbarEmployee">
            <MdOutlineNotificationsActive className="notification" />
            <p>{employee?.FullName}</p>
            <img className="avatar" src={employee?.imageEmployee ? convertImageByte(employee?.imageEmployee) : images.avatarnull}
                onClick={() => setShowDrawerRight(true)}
            />

            {showDrawerRight &&
                <DrawerRight handleCloseDrawerRight={() => setShowDrawerRight(false)} setScreenName={setScreenName} employee={employee} />}
        </div>
    )
}

export default NavbarEmployee