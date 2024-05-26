import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './Content.css'

//all pages
import Home from '../home/Home'
import Product from '../product/typeShowProduct/Product'
import Project from '../project/Project'
import Login from '../login/Login'
import Register from '../register/Register'
import Cart from '../cart/Cart'
import TestArea from '../testArea/TestArea'
import ProductDetail from '../product/procductDetail/ProductDetail'
import Payment from '../payment/Payment'
import ProductPhylum from '../product/typeShowProduct/ProductPhylum'
import ProductClass from '../product/typeShowProduct/ProductClass'
import ProductGenus from '../product/typeShowProduct/ProductGenus'
import ProductSpecies from '../product/typeShowProduct/ProductSpecies'
import Profile from '../profile/Profile'
import ForgetPass from '../forgetPass/ForgetPass'
import PaymentSuccess from '../paymentSuccess/PaymentSuccess'
import Order from '../order/Order'
import OrderDetail from '../order/orderDetail/OrderDetail'

function Content() {
    const location = useLocation();
    const [showSpeciesBg, setShowSpeciesBg] = useState(false);

    useEffect(() => {
        setShowSpeciesBg(location.pathname === '/Login' || location.pathname === '/Register' || location.pathname === '/ForgetPass');
    }, [location]);
    return (
        <div className={`container ${showSpeciesBg ? 'species-background' : ''}`}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Product/:pageRouter' element={<Product />} />
                <Route path='/Project' element={<Project />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/ForgetPass' element={<ForgetPass />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Cart' element={<Cart />} />
                <Route path='/TestArea' element={<TestArea />} />
                <Route path='/ProductDetail/:id' element={<ProductDetail />} />

                <Route path='/Payment' element={<Payment />} />
                <Route path='/PaymentSuccess' element={<PaymentSuccess />} />
                <Route path='/Product/Phylum/:namePhylum/:pageRouter' element={<ProductPhylum />} />
                <Route path='/Product/Class/:nameClass/:pageRouter' element={<ProductClass />} />
                <Route path='/Product/Genus/:nameGenus/:pageRouter' element={<ProductGenus />} />
                <Route path='/Product/Species/:nameSpecies/:pageRouter' element={<ProductSpecies />} />
                <Route path='/Order' element={<Order />} />
                <Route path='/OrderDetail/:idOrder' element={<OrderDetail />} />
            </Routes>
        </div>
    )
}

export default Content