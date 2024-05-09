import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Navbar.css'
//assest
import { icons, images } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../srcRedux/features/customerSlice'

const listNavbarItem = [
    {
        title: 'Trang chủ',
        to: '/'
    },
    {
        title: 'Sản phẩm',
        to: '/Product'
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
const Navbar = ({ theme, setTheme }) => {
    const navigate = useNavigate()
    const ToggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
    const [isHovered, setIsHovered] = useState(false)
    const [username, setUsername] = useState(localStorage.getItem('username'))
    //redux
    const cc = useSelector(state => state.customer.customerName)
    const isLogin = useSelector(state => state.customer.isLogin)
    const dispatch = useDispatch()
    //dùng redux

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('username');
    };

    return (
        <div>
            <nav className={!isHovered ? 'Navbar' : 'Navbar hovered'}>
                <img src={theme === 'light' ? icons.logolight : icons.logodark} alt='Logo' className='logo' />
                <ul >
                    {
                        listNavbarItem.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className='Link'
                                    to={item.to}
                                    onMouseEnter={() => { setIsHovered(true) }}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
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

                {/* <img src={icons.toggle} alt='Toggle' className='toggle-icon' onClick={() => ToggleTheme()} /> */}
                
                {
                    isLogin ?
                        <div>
                            <span className='username'>{cc}</span>
                            <button className='btn-logout' onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </div> :

                        <button className='btn-login'
                            onMouseEnter={() => { setIsHovered(true) }}
                            onMouseLeave={() => setIsHovered(false)}>
                            <Link className='Link' to='/Login'
                                onMouseEnter={() => { setIsHovered(true) }}
                                onMouseLeave={() => setIsHovered(false)}>Đăng nhập</Link>
                        </button>
                }
                <img src={icons.cart} alt='cart' className='img-cart' onClick={() => navigate('/Cart')} />
            </nav>


        </div>
    )
}

export default Navbar
