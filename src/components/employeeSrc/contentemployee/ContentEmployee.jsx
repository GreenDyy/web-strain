import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './ContentEmployee.scss'

//all pages
import LoginEmployee from '../loginemployee/LoginEmployee';
import DashBoard from '../dashboard/DashBoard';

function ContentEmployee() {
    return (
        <div className={`container`}>
            <Routes>
                <Route path='/' element={<LoginEmployee />} />
                <Route path='/Login' element={<LoginEmployee />} />
                <Route path='/DashBoard' element={<DashBoard />} />
            </Routes>
        </div>
    )
}

export default ContentEmployee