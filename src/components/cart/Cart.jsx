import React, { useEffect, useState } from 'react'
import './Cart.scss'

import { icons, images } from '../../constants'
import { Link, useNavigate } from 'react-router-dom'
import { getCartByIdCustomer, getAllDetailCart, updateDetailCart } from '../../apis/apiCart'
import { formatCurrency, getDataLocalStorage, setDataLocalStorage } from '../../utils/Utils'

const ItemCart = ({ item, onIncrease, onDecrease }) => {
    const tongTien = formatCurrency(item.idStrainNavigation.price * item.quantityOfStrain)
    return (
        <tr style={{ alignItems: 'center', justifyContent: 'center' }}>
            <td className='card-product'>
                <img src={images.mario} style={{}} />
                <div className='card-text'>
                    <p className='title'>{item.idStrainNavigation.scientificName}</p>
                    <p className='des'>Môi trường sống: {item.idStrainNavigation.isolationSource}</p>
                </div>
            </td>

            <td className='price'>{formatCurrency(item.idStrainNavigation.price)} VNĐ</td>

            <td >
                <div className='card-quantity'>
                    <button className='btn-decrease' onClick={() => { onDecrease(item) }}>-</button>
                    {/* <p className='quantity'>{item.quantity}</p> */}
                    <input className='quantity' type='text' value={item.quantityOfStrain} />
                    <button className='btn-increase' onClick={() => { onIncrease(item) }}>+</button>
                </div>

            </td>
            <td className='price'>{tongTien} VNĐ</td>
        </tr>
    )
}

function Cart() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('')
    const navigate = useNavigate()
    const [listCartItem, setListCartItem] = useState([])
    const [tongTien, setTongTien] = useState(0)
    const [thanhTien, setThanhTien] = useState(0)

    // Kiểm tra xem có người dùng trong localStorage không
    useEffect(() => {
        const user = getDataLocalStorage('user');
        setIsLoggedIn(user ? true : false);
    }, []);

    //check xem đang login chưa, hay có idCart trog local chưa, idCart có khi login thôi
    useEffect(() => {
        // Nếu không có người dùng đăng nhập, hiển thị nút đăng nhập
        if (!isLoggedIn) {
            return;
        }
        
        const fetchData = async () => {
            const idCustomer = await getDataLocalStorage('user').data.idCustomer;
            const cart = await getCartByIdCustomer(idCustomer);
            const allDetailCart = await getAllDetailCart(cart.data.idCart);
            setListCartItem(allDetailCart.data);
            setDataLocalStorage('user')
        };
        fetchData();
    }, [isLoggedIn]);

    //cập nhật tiền
    useEffect(() => {
        let totalPrice = 0;
        listCartItem.forEach(item => {
            totalPrice += item.idStrainNavigation.price * item.quantityOfStrain
        })
        setTongTien(totalPrice)
        setThanhTien(totalPrice + totalPrice * 0.1)
    }, [listCartItem]) //khi list item dc cập nhật giá trị khác thì nó chạy lại cái này

    const increaseQuantity = (item) => {
        const updatedCartItems = listCartItem.map(cartDetail => {
            if (cartDetail.idCartDetail === item.idCartDetail) {
                const newQuantity = cartDetail.quantityOfStrain + 1;
                // Gọi hàm cập nhật chi tiết giỏ hàng trên server
                updateDetailCart(cartDetail.idCartDetail, { idStrain: cartDetail.idStrain, quantityOfStrain: newQuantity });
                return {
                    ...cartDetail,
                    quantityOfStrain: newQuantity
                };
            }
            return cartDetail;
        });
        setListCartItem(updatedCartItems);
        setDataLocalStorage('cart', updatedCartItems)
    };

    const decreaseQuantity = (item) => {
        const updatedCartItems = listCartItem.map(cartDetail => {
            if (cartDetail.idCartDetail === item.idCartDetail && cartDetail.quantityOfStrain > 1) {
                const newQuantity = cartDetail.quantityOfStrain - 1;
                // Gọi hàm cập nhật chi tiết giỏ hàng trên server
                updateDetailCart(cartDetail.idCartDetail, { idStrain: cartDetail.idStrain, quantityOfStrain: newQuantity });
                return {
                    ...cartDetail,
                    quantityOfStrain: newQuantity
                };
            }
            return cartDetail;
        });
        setListCartItem(updatedCartItems);
        setDataLocalStorage('cart', updatedCartItems)
    };


    return (

        <div className='Cart'>
            {
                isLoggedIn && listCartItem.length != 0 ?
                    (
                        <>
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
                                            value="khinhanhang"
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            checked={paymentMethod === 'khinhanhang'}
                                        />
                                        Thanh toán khi nhận hàng
                                    </label>
                                    <div style={{ display: 'flex' }}>
                                        <input
                                            type="radio"
                                            value="momo"
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            checked={paymentMethod === 'momo'}
                                        />
                                        <img src={icons.momo} style={{ height: 40, width: 40 }} />
                                    </div>

                                </div>


                                <button className='btn-thanh-toan'>THANH TOÁN</button>

                                <p style={{ textAlign: 'center' }}>Hoặc</p>

                                <button className='btn-continue' onClick={() => { navigate('/Product') }}>TIẾP TỤC MUA SẮM</button>
                            </div>
                        </>
                    )
                    :
                    <div>
                        {
                            isLoggedIn ?
                            <h2>Không có gì trong giỏ</h2>
                            :
                            <button>Đăng nhập</button>

                        }
                       
                    </div>
            }

        </div >
    )
}

export default Cart
