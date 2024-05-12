import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Navbar.css'
//assest
import { icons } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../srcRedux/features/customerSlice'
import { getDataLocalStorage, removeDataLocalStorage } from '../../utils/Utils'

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
const Navbar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isHoveredDropdown, setIsHoveredDropdown] = useState(false)

    //redux
    const dispatch = useDispatch()
    const username = useSelector(state => state.customer.customerData?.data?.fullName)
    const isLogin = useSelector(state => state.customer.isLogin)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getDataLocalStorage('user');
                console.log("User from Local Storage:", user);
                if (user) {
                    setUser(user);
                    console.log("a", user.data);
                } else {
                    console.log("No user data found in Local Storage");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        dispatch(logout())
        removeDataLocalStorage('user');
        setUser(null)
        removeDataLocalStorage('idCart');
        removeDataLocalStorage('cart');
        alert('Đăng xuất thành công')
        console.log('Đã logout, xoá user khỏi local')
    };

    return (
        <div>
            <nav className='Navbar'>
                <img src={icons.logolight} alt='Logo' className='logo' />
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

                {
                    (isLogin || user) ?
                        <div className='dropwdown-wrap'
                            onMouseEnter={() => { setIsHoveredDropdown(true) }}
                            onMouseLeave={() => setIsHoveredDropdown(false)}>
                            <div className='dropdown-trigger'>
                                <Link className='Link'>{user?.data?.fullName}</Link>
                            </div>
                            {
                                isHoveredDropdown &&
                                <div className='dropdown-content' style={{ position: 'absolute' }}>
                                    <ul style={{ display: 'flex', flexDirection: 'column' }}>
                                        <li>
                                            <button className='btn-logout' onClick={handleLogout}>
                                                Đăng xuất
                                            </button>
                                        </li>
                                        <li>Item 2</li>
                                        <li>Item 3</li>
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
                <img src={icons.cart} alt='cart' className='img-cart' onClick={() => navigate('/Cart')} />
            </nav>


        </div>
    )
}

export default Navbar
