import React from 'react'
import {Link } from 'react-router-dom'

import './Navbar.css'
//assest
import {icons, images} from '../../constants/constants'

const Navbar = ({ theme, setTheme }) => {
    const colorText = theme === 'light' ? '#00A551' : 'white'
    const ToggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    return (
        <div>
            <nav className='navbar'>
                <img src={theme === 'light' ? icons.logolight : icons.logodark} alt='Logo' className='logo' />
                <ul >
                    <li>
                        <Link className='Link' to='/' >Trang chủ</Link>
                    </li>
                    <li>
                        <Link to='/Product' className='Link'>Sản phẩm</Link>
                    </li>
                    <li>
                        <Link to='/Intro' className='Link'>Đăng nhập</Link>
                    </li>
                    <li>
                        <Link to='/Project' className='Link'>Nghiên cứu</Link>
                    </li>
                    <li>
                        <Link to='/Intro' className='Link'>Truyền thông</Link>
                    </li>
                    <li>
                        <Link to='/Intro' className='Link'>Về chúng tôi</Link>
                    </li>
                </ul>

                <div className='search-box'>
                    <input type='text' placeholder='Nhập nội dung tìm kiếm...' />
                    <img src={icons.searchicon} alt='Search Icon' />
                </div>

                <img src={icons.toggle} alt='Toggle' className='toggle-icon' onClick={() => ToggleTheme()} />
            </nav>

            
        </div>
    )
}

export default Navbar
