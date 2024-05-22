import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Navbar.css'
//assest
import { icons } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../srcRedux/features/customerSlice'
import { TfiShoppingCartFull } from "react-icons/tfi";
import { setTotalAllProduct } from '../../srcRedux/features/cartSlice'
import { FaUserAstronaut } from "react-icons/fa6";


const listNavbarItem = [
    {
        title: 'Trang chủ',
        to: '/'
    },
    {
        title: 'Sản phẩm',
        to: '/Product/1'
    },
    {
        title: 'Nghiên cứu',
        to: '/Project'
    },
    {
        title: 'Truyền thông',
        to: '/Intro'
    },
    {
        title: 'Về chúng tôi',
        to: '/Intro'
    },
]
const Navbar = () => {
    const navigate = useNavigate()
    const [isHoveredDropdown, setIsHoveredDropdown] = useState(false)

    //redux
    const dispatch = useDispatch()
    const customerData = useSelector(state => state.customer.customerData?.data)
    const isLogin = useSelector(state => state.customer.isLogin)
    const totalAllProduct = useSelector(state => state.cart.totalAllProduct)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(setTotalAllProduct(0))
        alert('Đăng xuất thành công')
    };

    return (
        <div>
            <nav className='Navbar'>
                <img src={icons.logo} alt='Logo' className='logo' onClick={() => navigate('/')} />
                <ul >
                    {
                        listNavbarItem.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className='Link'
                                    to={item.to}>
                                    {item.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>

                <div className='col-3'>
                    {/* <div className='search-box'>
                        <input type='text' placeholder='Nhập nội dung tìm kiếm...' />
                        <img src={icons.searchicon} alt='Search Icon' />
                    </div> */}
                    {isLogin ?
                        <div className='dropwdown-wrap'
                            onMouseEnter={() => { setIsHoveredDropdown(true) }}
                            onMouseLeave={() => setIsHoveredDropdown(false)}>
                            <div className='dropdown-trigger'>
                                <div className='user'>
                                    <FaUserAstronaut className='user-icon' />
                                    <p className='user-name'>{customerData?.fullName}</p>
                                </div>
                            </div>
                            {isHoveredDropdown &&
                                <div className='dropdown-content' style={{ position: 'absolute' }}>
                                    <ul>
                                        <li onClick={handleLogout}>
                                            Thông tin cá nhân
                                        </li>
                                        <li onClick={handleLogout}>
                                            Đơn hàng của tôi
                                        </li>
                                        <li onClick={handleLogout}>
                                            Đăng xuất
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                        :
                        <div>
                            <button className='btn-login' onClick={() => navigate('/Login')} >
                                Đăng nhập
                            </button>

                            <button className='btn-register' onClick={() => navigate('/Register')} >
                                Đăng ký
                            </button>
                        </div>
                    }

                    <div className='btn-cart'>
                        {/* <TfiShoppingCartFull style={{ color: '#00A551', marginLeft: 15, fontSize: 30, cursor: 'pointer' }} onClick={() => navigate('/Cart')} /> */}
                        <img src={icons.cart} alt='cart' className='img-cart' onClick={() => navigate('/Cart')} />
                        <div className='cover-quantity'>
                            <p>{totalAllProduct}</p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
