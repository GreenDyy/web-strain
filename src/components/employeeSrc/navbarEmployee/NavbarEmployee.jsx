import React, { useState } from "react";
import './NavbarEmployee.scss'
import { MdOutlineNotificationsActive } from "react-icons/md";
import DrawerRight from "../drawerRight/DrawerRight";

function NavbarEmployee({ employee, setScreenName }) {
    const [showDrawerRight, setShowDrawerRight] = useState(false)
    return (
        <div className="NavbarEmployee">
            <MdOutlineNotificationsActive className="notification" />
            <p>{employee?.FullName}</p>
            <img className="avatar" src="https://i.pinimg.com/564x/40/96/8c/40968c12dce5289c3341131eaf03db19.jpg"
                onClick={() => setShowDrawerRight(true)}
            />

            {showDrawerRight &&
                <DrawerRight handleCloseDrawerRight={()=>setShowDrawerRight(false)} setScreenName={setScreenName} employee={employee}/>}
        </div>
    )
}

export default NavbarEmployee