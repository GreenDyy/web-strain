import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './Content.css'

//all pages
import Home from '../home/Home'
import Product from '../product/Product'
import Login from '../login/Login'
import Register from '../register/Register'
import Cart from '../cart/Cart'
import TestArea from '../testArea/TestArea'
import ProductDetail from '../product/procductDetail/ProductDetail'
import Payment from '../payment/Payment'
import Profile from '../profile/Profile'
import ForgetPass from '../forgetPass/ForgetPass'
import PaymentSuccess from '../paymentSuccess/PaymentSuccess'
import Order from '../order/Order'
import OrderDetail from '../order/orderDetail/OrderDetail'
import NewsPaper from '../newspaper/NewsPaper'

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
                <Route path="/Product/:category/:typeName/:pageRouter" element={<Product />} />
                <Route path="/Product/:pageRouter" element={<Product />} />

                <Route path='/NewsPaper' element={<NewsPaper />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/ForgetPass' element={<ForgetPass />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Cart' element={<Cart />} />
                <Route path='/TestArea' element={<TestArea />} />
                <Route path='/ProductDetail/:id' element={<ProductDetail />} />
                <Route path='/Payment' element={<Payment />} />
                <Route path='/PaymentSuccess' element={<PaymentSuccess />} />
                <Route path='/Order' element={<Order />} />
                <Route path='/OrderDetail/:idOrder' element={<OrderDetail />} />
            </Routes>
        </div>
    )
}

export default Content