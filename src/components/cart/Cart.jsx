import React, { useEffect, useState } from 'react'
import './Cart.scss'

import { icons, images } from '../../constants'
import { Link, useNavigate } from 'react-router-dom'


const dataCart = [
    {
        title: 'Garen',
        location: 'TP Hồ Chí Minh',
        price: 250,
        quantity: 4,
    },
    {
        title: 'Darius',
        location: 'Hà Nội',
        price: 300,
        quantity: 2,
    },
    {
        title: 'Jinx',
        location: 'Đà Nẵng',
        price: 180,
        quantity: 3,
    },
    {
        title: 'Lux',
        location: 'Huế',
        price: 200,
        quantity: 5,
    },
    {
        title: 'Vayne',
        location: 'Hải Phòng',
        price: 220,
        quantity: 1,
    }

]

const ItemCart = ({ item, onIncrease, onDecrease }) => {
    const tongTien = item.price * item.quantity
    return (
        <tr style={{ alignItems: 'center', justifyContent: 'center' }}>
            <td className='card-product'>
                <img src={images.mario} style={{}} />
                <div className='card-text'>
                    <p className='title'>{item.title}</p>
                    <p className='des'>Vị trị sống: {item.location}</p>
                </div>
            </td>

            <td className='price'>{item.price}$</td>

            <td >
                <div className='card-quantity'>
                    <button className='btn-decrease' onClick={() => { onDecrease(item) }}>-</button>
                    <p className='quantity'>{item.quantity}</p>
                    <button className='btn-increase' onClick={() => { onIncrease(item) }}>+</button>
                </div>

            </td>
            <td className='price'>{tongTien}$</td>
        </tr>
    )
}

function Cart() {
    const [paymentMethod, setPaymentMethod] = useState('')
    const navigate = useNavigate()
    const [listCartItem, setListCartItem] = useState(dataCart)
    const [tongTien, setTongTien] = useState(0)
    const [thanhTien, setThanhTien] = useState(0)

    useEffect(() => { 
        console.log('useEffect')
        const cartDataLocal = JSON.parse(localStorage.getItem('cart'));
        if (cartDataLocal) {
            setListCartItem(cartDataLocal);
        } else {
            setListCartItem(dataCart);
            localStorage.setItem('cart', JSON.stringify(dataCart));
        }
    }, []);

    //cập nhật tiền
    useEffect(() => {
        let totalPrice = 0;
        listCartItem.forEach(item => {
            totalPrice += item.price * item.quantity
        })
        setTongTien(totalPrice)
        setThanhTien(totalPrice + totalPrice * 0.1)
    }, [listCartItem]) //khi list item dc cập nhật giá trị khác thì nó chạy lại cái này


    const increaseQuantity = (item) => {
        const updatedCartItems = listCartItem.map(cartItem => {
            if (cartItem.title === item.title) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                };
            }
            return cartItem;
        });
        setListCartItem(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const decreaseQuantity = (item) => {
        const updatedCartItems = listCartItem.map(cartItem => {
            if (cartItem.title === item.title && cartItem.quantity > 1) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity - 1
                };
            }
            return cartItem;
        });
        setListCartItem(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };


    return (
       
        <div className='Cart'>
 {
            console.log('cc')
        }
            <div className='col-1'>
                <h1>Giỏ hàng</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Strain</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listCartItem.map((item, index) => (
                                <ItemCart
                                    key={index}
                                    item={item}
                                    onIncrease={increaseQuantity}
                                    onDecrease={decreaseQuantity} />
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className='col-2'>
                <h2>Tóm tắt đơn hàng</h2>
                <div style={{ borderBottom: '1px solid white', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <p>Tổng tiền</p>
                        <p>Thuế</p>
                        <p>Thành tiền</p>
                    </div>
                    <div>
                        {

                        }
                        <p>{tongTien}$</p>
                        <p>120$</p>
                        <p>{thanhTien}$</p>
                    </div>
                </div>

                <div>
                    <p>Áp dụng voucher</p>
                    <div className='box-voucher'>
                        <input type='text' placeholder='Mã Voucher' />
                        <button>Áp dụng</button>
                    </div>
                </div>

                <p>Phương thức thanh toán</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="radio"
                            value="option1"
                            checked={paymentMethod === 'option1'}
                            onChange={(text) => setPaymentMethod(text.target.value)}
                        />
                        Thanh toán khi nhận hàng
                    </label>
                    <div style={{ display: 'flex' }}>
                        <input
                            type="radio"
                            value="option1"
                            checked={paymentMethod === 'option1'}
                            onChange={(text) => setPaymentMethod(text.target.value)}
                        />
                        <img src={icons.momo} style={{ height: 40, width: 40 }} />
                    </div>

                </div>


                <button className='btn-thanh-toan'>THANH TOÁN</button>

                <p style={{ textAlign: 'center' }}>Hoặc</p>

                <button className='btn-continue' onClick={() => { navigate('/Product') }}>TIẾP TỤC MUA SẮM</button>
            </div>
        </div >
    )
}

export default Cart
