import React, { useState } from "react";
import './DashBoard.scss'
import Drawer from "../drawer/Drawer";
import NavbarEmployee from "../navbarEmployee/NavbarEmployee";
import Main from "../main/Main";
import { getDataLocalStorage } from "../../../utils/Utils";

function DashBoard() {
    const [screenName, setScreenName] = useState(getDataLocalStorage('screenNameOfDrawer') || 'contentWork'); 
    return (
        <div className="DashBoard">
             <Drawer setScreenName={setScreenName} />

            <div className="col-2">
                <NavbarEmployee />
                <Main nameScreen={screenName}/>
            </div>
        </div>
    )
}

export default DashBoard