import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../srcRedux/features/customerSlice'
//assest
import { icons, images } from '../../constants'

//icons
import { TfiShoppingCartFull } from "react-icons/tfi";
import { setTotalAllProduct } from '../../srcRedux/features/cartSlice'
import { FaUserAstronaut } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { convertImageByte, removeDataLocalStorage } from '../../utils/Utils'
import { getAllStrainByNumberAndNameApi } from '../../apis/apiStrain'


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
        title: 'Báo khoa học',
        to: '/Newspaper'
    },
    {
        title: 'Về chúng tôi',
        to: '/AboutUs'
    },
    {
        title: 'Liên hệ',
        to: '/AboutUs'
    },
]

const ItemDropdown = ({ item, onClick }) => {
    const imageSrc = item?.imageStrain ? convertImageByte(item?.imageStrain) : images.strainnull
    return (
        <div className='item-dropdown' onClick={onClick}>
            <div className='img-item'>
                <img src={imageSrc} alt='img-strain' />
            </div>
            <div className='wrap-text'>
                <p className='title-item'>{item?.scientificName}</p>
                <p className='number-item'>{item?.strainNumber}</p>
            </div>
        </div>
    )
}

const Navbar = () => {
    const navigate = useNavigate()
    const [isHoveredDropdown, setIsHoveredDropdown] = useState(false)
    const [isSelected, setIsSelected] = useState(1)
    const [search, setSearch] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [dataSearch, setDataSearch] = useState([])

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const timerId = setTimeout(async () => {
            const dataSearch = await getAllStrainByNumberAndNameApi(search);
            setDataSearch(dataSearch.data);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [search])

    //redux
    const dispatch = useDispatch()
    const customerData = useSelector(state => state.customer.customerData)
    const isLogin = useSelector(state => state.customer.isLogin)
    const totalAllProduct = useSelector(state => state.cart.totalAllProduct)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(setTotalAllProduct(0))
        navigate('/')
        alert('Đăng xuất thành công')
    };
    const srcAvatar = customerData?.image ? convertImageByte(customerData.image) : images.avatarnull

    return (
        <div>
            <nav className='Navbar'>
                <img src={icons.logo} alt='Logo App-logo' className='logo' onClick={() => navigate('/')} />
                <ul >
                    {
                        listNavbarItem.map((item, index) => (
                            <li key={index}>
                                <Link
                                    // className={`Link ${isSelected === index + 1 ? 'selected' : ''}`}
                                    className="Link"
                                    to={item.to}
                                    onClick={() => {
                                        setIsSelected(index + 1)
                                        removeDataLocalStorage('node')
                                    }}>
                                    {item.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>


                <div className='col-user'>
                    <div className='wrap-search-content' ref={dropdownRef}>
                        <div className='search-box-nav'>
                            <input
                                className='input-search-nav'
                                type='text'
                                placeholder='Nhập mã hoặc tên chủng cần tìm...'
                                value={search}
                                onFocus={() => setShowDropdown(true)}
                                onChange={(event) => setSearch(event.target.value)} />
                            <IoSearchCircle className='icon-search-nav' />
                        </div>
                        {showDropdown && search !== '' && dataSearch.length !== 0 &&
                            <div className='dropdown-content'>
                                {dataSearch?.length !== 0 &&
                                    dataSearch?.map((item, index) => {
                                        return (
                                            <ItemDropdown key={index} item={item} onClick={() => { navigate(`/ProductDetail/${item?.idStrain}`) }} />
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    {isLogin ?
                        <div className='dropwdown-wrap'
                            onMouseEnter={() => { setIsHoveredDropdown(true) }}
                            onMouseLeave={() => setIsHoveredDropdown(false)}>
                            <div className='dropdown-trigger'>
                                <div className='user'>
                                    <img src={srcAvatar} />
                                    <p className='user-name'>{customerData?.fullName}</p>
                                </div>
                            </div>

                            <div className={`dropdown-content ${isHoveredDropdown ? 'show' : ''}`}>
                                <ul>
                                    <li onClick={() => navigate('/Profile')}>
                                        <FaUserAstronaut className='icon' />
                                        Thông tin cá nhân
                                    </li>
                                    <li onClick={() => navigate('/Order')}>
                                        <TfiShoppingCartFull className='icon' />
                                        Đơn hàng của tôi
                                    </li>
                                    <li onClick={handleLogout}>
                                        <SlLogout className='icon' />
                                        Đăng xuất
                                    </li>
                                </ul>
                            </div>

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
