import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './Content.css'

//all pages
import Home from '../home/Home'
import Product from '../product/Product'
import Project from '../project/Project'
import Login from '../login/Login'
import Cart from '../cart/Cart'
import TestArea from '../testArea/TestArea'
import ProductDetail from '../product/ProductDetail'

function Content() {
    const location = useLocation();
    const [isLoginPage, setIsLoginPage] = useState(false);

    useEffect(() => {
        setIsLoginPage(location.pathname === '/Login');
    }, [location]);
    return (
        <div className={`container ${isLoginPage ? 'login-background' : ''}`}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Product/:pageRouter' element={<Product />} />
                <Route path='/Project' element={<Project />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Cart' element={<Cart />} />
                <Route path='/TestArea' element={<TestArea />} />
                <Route path='/ProductDetail/:id' element={<ProductDetail />} />
            </Routes>
        </div>
    )
}

export default Content