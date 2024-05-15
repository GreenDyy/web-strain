import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Navbar.css'
//assest
import { icons } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../srcRedux/features/customerSlice'
import { TfiShoppingCartFull } from "react-icons/tfi";

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

    const handleLogout = () => {
        dispatch(logout())
        alert('Đăng xuất thành công')
    };

    return (
        <div>
            <nav className='Navbar'>
                <img src={icons.logo} alt='Logo' className='logo' />
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

                {/* <div className='search-box'>
                    <input type='text' placeholder='Nhập nội dung tìm kiếm...' />
                    <img src={icons.searchicon} alt='Search Icon' />
                </div> */}

                <div className='col-3'>
                    {
                        (isLogin) ?
                            <div className='dropwdown-wrap'
                                onMouseEnter={() => { setIsHoveredDropdown(true) }}
                                onMouseLeave={() => setIsHoveredDropdown(false)}>
                                <div className='dropdown-trigger'>
                                    <Link className='Link'>{customerData?.fullName}</Link>
                                </div>
                                {
                                    isHoveredDropdown &&
                                    <div className='dropdown-content' style={{ position: 'absolute' }}>
                                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                                            <li>
                                                <button className='btn-logout' onClick={handleLogout}>
                                                    Thông tin cá nhân
                                                </button>
                                            </li>
                                            <li>
                                                <button className='btn-logout' onClick={handleLogout}>
                                                    Đơn hàng của tôi
                                                </button>
                                            </li>
                                            <li>
                                                <button className='btn-logout' onClick={handleLogout}>
                                                    Đăng xuất
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                }

                            </div> :

                            <button className='btn-login'
                            >
                                <Link className='Link' to='/Login'
                                >Đăng nhập</Link>
                            </button>
                    }
                    {/* <img src={icons.cart} alt='cart' className='img-cart' onClick={() => navigate('/Cart')} /> */}
                    <TfiShoppingCartFull style={{ color: 'white', marginLeft: 15, fontSize: 30, cursor: 'pointer' }} onClick={() => navigate('/Cart')} />
                </div>
            </nav>


        </div>
    )
}

export default Navbar
