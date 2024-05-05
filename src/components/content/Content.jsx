import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './Content.css'

//all pages
import Home from '../home/Home'
import Product from '../product/Product'
import Project from '../project/Project'
import Login from '../login/Login'

function Content() {

    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Product' element={<Product />} />
                <Route path='/Project' element={<Project />} />
                <Route path='/Login' element={<Login />} />
            </Routes>
        </div>
    )
}

export default Content