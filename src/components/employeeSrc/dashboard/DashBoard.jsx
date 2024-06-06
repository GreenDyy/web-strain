import React, { useEffect, useState } from "react";
import './DashBoard.scss'
import Drawer from "../drawer/Drawer";
import NavbarEmployee from "../navbarEmployee/NavbarEmployee";
import Main from "../main/Main";
import { getDataLocalStorage } from "../../../utils/Utils";

function DashBoard() {
    const dataEmployee = {
        idEmployee: 'NV002',
        nameEmployee: 'Huỳnh Khánh Duy'
    }
    const [employee, setEmployee] = useState(null)
    useEffect(()=>{
        setEmployee(dataEmployee)
    }, [])
    const [screenName, setScreenName] = useState(getDataLocalStorage('screenNameOfDrawer') || 'contentWork'); 
    return (
        <div className="DashBoard">
             <Drawer setScreenName={setScreenName} />

            <div className="col-2">
                <NavbarEmployee employee={employee}/>
                <Main nameScreen={screenName} employee={employee}/>
            </div>
        </div>
    )
}

export default DashBoard