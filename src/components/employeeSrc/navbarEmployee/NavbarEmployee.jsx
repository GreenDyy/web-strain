import React from "react";
import './NavbarEmployee.scss'
import { MdOutlineNotificationsActive } from "react-icons/md";


function NavbarEmployee() {
    return (
        <div className="NavbarEmployee">
           <MdOutlineNotificationsActive className="notification"/>
          <img className="avatar" src="https://i.pinimg.com/564x/40/96/8c/40968c12dce5289c3341131eaf03db19.jpg"/>
        </div>
    )
}

export default NavbarEmployee