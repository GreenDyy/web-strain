import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
import { LuShoppingCart } from "react-icons/lu";
//assest
import { icons, images } from '../../constants'

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
    const ToggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
    const [isHovered, setIsHovered] = useState(false)
    const [username, setUsername] = useState(localStorage.getItem('username'))
    //dùng redux

    const handleLogout = () => {
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
                    username ?
                        <div>
                            <span className='username'>{username}</span>
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

                <button className='btn-cart' onC>
                    <Link to='/Cart'>
                        <img src={icons.cart} alt='cart' className='img-cart' />
                        {/* <LuShoppingCart className='icon' /> */}
                    </Link>
                </button>
            </nav>


        </div>
    )
}

export default Navbar
