import React, { useEffect, useState } from 'react'
import './Cart.scss'

import { icons } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { getAllDetailCartApi, removeDetailCartApi, updateDetailCartApi } from '../../apis/apiCart'
import { convertImageByte, formatCurrency } from '../../utils/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getInventoryByIdStrainApi } from '../../apis/apiInventory'
import { toastSuccess } from '../Toast/Toast'

const ItemCart = ({ item, onIncrease, onDecrease, onRemove }) => {
    const [tongTien, setTongTien] = useState(null)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        const fetchInventory = async () => {
            const response = await getInventoryByIdStrainApi(item.idStrain)
            const inventory = response.data;
            const totalPrice = inventory.price * item.quantityOfStrain
            setPrice(formatCurrency(inventory.price))
            setTongTien(formatCurrency(totalPrice))
        };

        fetchInventory();
    }, [item]);
    return (
        <tr style={{ alignItems: 'center', justifyContent: 'center' }}>
            <td className='card-product'>
                <img src={convertImageByte(item.idStrainNavigation.imageStrain)} style={{}} />
                <div className='card-text'>
                    <p className='title'>{item.idStrainNavigation.scientificName}</p>
                    <p className='des'>Môi trường sống: {item.idStrainNavigation.isolationSource}</p>
                </div>
            </td>

            <td className='price'>{price} VNĐ</td>

            <td >
                <div className='card-quantity'>
                    <button className='btn-decrease' onClick={() => { onDecrease(item) }}>-</button>
                    <input className='quantity' type='text' value={item.quantityOfStrain} />
                    <button className='btn-increase' onClick={() => { onIncrease(item) }}>+</button>
                </div>
            </td>

            <td className='price'>{tongTien} VNĐ</td>

            <td>
                <RiDeleteBin5Fill className='icon-cart' onClick={() => onRemove(item)} />
            </td>
        </tr>
    )
}
//--MAIN
function Cart() {
    const [paymentMethod, setPaymentMethod] = useState('')
    const navigate = useNavigate()
    const [listCartItem, setListCartItem] = useState([])
    const [tongTien, setTongTien] = useState(0)
    const [thanhTien, setThanhTien] = useState(0)
    const [reloadData, setReloadData] = useState(false);

    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.customer.isLogin)
    const idCart = useSelector(state => state.customer.idCart)


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllDetailCartApi(idCart)
            setListCartItem(data.data)
        }
        fetchData()
    }, [reloadData])

    //cập nhật tiền
    useEffect(() => {
        let totalPrice = 0
        const updateTongTien = async () => {
            for (const item of listCartItem) {
                const response = await getInventoryByIdStrainApi(item.idStrain)
                const inventory = response.data
                totalPrice += inventory.price * item.quantityOfStrain
            }
            setTongTien(totalPrice)
            setThanhTien(totalPrice + totalPrice * 0.1)
        }
        updateTongTien()
    }, [listCartItem])

    const increaseQuantity = async (item) => {
        // const updatedCartItems = listCartItem.map(cartDetail => {
        //     if (cartDetail.idCartDetail === item.idCartDetail) {
        //         const newQuantity = cartDetail.quantityOfStrain + 1;
        //         // Gọi hàm cập nhật chi tiết giỏ hàng trên server
        //         updateDetailCartApi(cartDetail.idCartDetail, { idStrain: cartDetail.idStrain, quantityOfStrain: newQuantity });
        //         return {
        //             ...cartDetail,
        //             quantityOfStrain: newQuantity
        //         };
        //     }
        //     return cartDetail;
        // });
        // setListCartItem(updatedCartItems);
        for (let i = 0; i < listCartItem.length; i++) {
            if (listCartItem[i].idCartDetail === item.idCartDetail) {
                const newQuantity = listCartItem[i].quantityOfStrain + 1;
                updateDetailCartApi(listCartItem[i].idCartDetail, { idStrain: listCartItem[i].idStrain, quantityOfStrain: newQuantity });
                //cập nhật quantity
                listCartItem[i].quantityOfStrain = newQuantity;
                setListCartItem([...listCartItem]);
                return
            }
        }
        setListCartItem(listCartItem);
    }

    const decreaseQuantity = (item) => {
        for (let i = 0; i < listCartItem.length; i++) {
            if (listCartItem[i].idCartDetail === item.idCartDetail) {
                if (listCartItem[i].quantityOfStrain > 1) {
                    const newQuantity = listCartItem[i].quantityOfStrain - 1;
                    updateDetailCartApi(listCartItem[i].idCartDetail, { idStrain: listCartItem[i].idStrain, quantityOfStrain: newQuantity });
                    //cập nhật quantity
                    listCartItem[i].quantityOfStrain = newQuantity;
                    setListCartItem([...listCartItem]);
                    return
                }
                else {
                    removeDetailCart(item)
                    return
                }
            }
        }
        setListCartItem(listCartItem);
    };

    const removeDetailCart = (item) => {
        toast.warning(
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ color: 'black' }}>Bạn có muốn xoá <strong>{item.idStrainNavigation.scientificName}</strong> khỏi giỏ hàng không?</p>

                <div className='toast-confirm' style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='btn-cancel'
                        style={{ backgroundColor: '#00A551', color: 'white', borderRadius: 3, flex: 1, marginRight: 5 }}
                        onClick={() => confirmRemove(item)}>Có</button>
                    <button className='btn-comfirm'
                        style={{ backgroundColor: 'white', color: 'black', border: '0.5px solid gray', borderRadius: 3, flex: 1, marginLeft: 5 }}
                        onClick={() => toast.dismiss()}>Không</button>
                </div>

            </div>,
            {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
    }

    const confirmRemove = async (item) => {
        console.log('trước khi xoá: ', listCartItem)
        await removeDetailCartApi(item.idCartDetail)
        //remove xong update lại cái giỏ hàng
        const listDetailCart = await getAllDetailCartApi(idCart)
        setListCartItem(listDetailCart.data)
        setReloadData(!reloadData);
        console.log('sau khi xoá: ', listCartItem)
        // dispatch(setAllDetailCart(listDetailCart.data))
        toast.dismiss()
        toastSuccess('Xoá thành công', 'top-right')
    }

    return (
        <div className='Cart'>
            {
                isLogin && listCartItem.length != 0 ?
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
                                                    onDecrease={decreaseQuantity}
                                                    onRemove={removeDetailCart} />
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


                                <button className='btn-thanh-toan' onClick={() => { navigate('/Payment') }}>THANH TOÁN</button>

                                <p style={{ textAlign: 'center' }}>Hoặc</p>

                                <button className='btn-continue' onClick={() => { navigate('/Product') }}>TIẾP TỤC MUA SẮM</button>
                            </div>
                        </>
                    )
                    :
                    <div>
                        {
                            isLogin ?
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
