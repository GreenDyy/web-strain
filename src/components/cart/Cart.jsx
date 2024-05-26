import React, { useEffect, useState } from 'react'
import './Cart.scss'

import { icons, images } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { getAllDetailCartApi, removeDetailCartApi, updateDetailCartApi } from '../../apis/apiCart'
import { convertImageByte, formatCurrency } from '../../utils/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getInventoryByIdStrainApi, updateInventoryByIdStrainApi } from '../../apis/apiInventory'
import { toastSuccess, toastWarning } from '../Toast/Toast'
import { setTotalAllProduct } from '../../srcRedux/features/cartSlice'

const ItemCart = ({ item, onIncrease, onDecrease, onRemove }) => {
    const [tongTien, setTongTien] = useState(0)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        const fetchInventory = async () => {
            const response = await getInventoryByIdStrainApi(item.idStrain)
            const inventory = response.data;
            const totalPrice = inventory.price * item.quantityOfStrain
            setPrice(inventory.price)
            setTongTien(totalPrice)
        };
        fetchInventory();
    }, [item.quantityOfStrain]);


    return (
        <tr style={{ alignItems: 'center', justifyContent: 'center' }}>
            <td className='card-product'>
                <img src={convertImageByte(item.idStrainNavigation.imageStrain)} />
                <div className='card-text'>
                    <p className='title'>{item.idStrainNavigation.scientificName}</p>
                    <p className='des'>Môi trường sống: {item.idStrainNavigation.isolationSource}</p>
                </div>
            </td>

            <td className='price'>{formatCurrency(price)} VNĐ</td>

            <td >
                <div className='card-quantity'>
                    <button className='btn-decrease' onClick={() => { onDecrease(item) }}>-</button>
                    {/* <input className='quantity' type='text' value={item.quantityOfStrain}/> */}
                    <p className='quantity'>{item.quantityOfStrain}</p>
                    <button className='btn-increase' onClick={() => { onIncrease(item) }}>+</button>
                </div>
            </td>

            <td className='price'>{formatCurrency(tongTien)} VNĐ</td>

            <td>
                <RiDeleteBin5Fill className='icon-cart' onClick={() => onRemove(item)} />
            </td>
        </tr>
    )
}
//--MAIN
function Cart() {
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('khinhanhang')
    const [listCartItem, setListCartItem] = useState([])
    const [tongTien, setTongTien] = useState(0)
    const [thanhTien, setThanhTien] = useState(0)
    const [tongThue, setTongThue] = useState(0)
    const [reloadData, setReloadData] = useState(false);

    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.customer.isLogin)
    const idCart = useSelector(state => state.customer.idCart)
    const totalAllProduct = useSelector(state => state.cart.totalAllProduct)


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllDetailCartApi(idCart)
            setListCartItem(data.data)
        }
        if (isLogin) {
            //có đăng nhập thì mới lấy data, tránh lỗi
            fetchData()
        }

    }, [reloadData])

    //cập nhật tiền
    useEffect(() => {
        let totalPrice = 0
        let totalTax = 0
        const updateTongTien = async () => {
            for (const item of listCartItem) {
                const response = await getInventoryByIdStrainApi(item.idStrain)
                const inventory = response.data
                totalPrice += inventory.price * item.quantityOfStrain
                totalTax += (inventory.price * 0.1) * item.quantityOfStrain //tax 10%
            }
            setTongTien(totalPrice)
            setTongThue(totalTax)
            console.log('tax:', totalTax)
            setThanhTien(totalPrice + totalTax)
        }
        updateTongTien()
    }, [listCartItem])

    const increaseQuantity = async (item) => {
        for (let i = 0; i < listCartItem.length; i++) {
            if (listCartItem[i].idCartDetail === item.idCartDetail) {
                //xử lý kho trước
                const apiInventory = await getInventoryByIdStrainApi(item.idStrain)
                if (apiInventory.data.quantity > 0) {
                    updateInventoryByIdStrainApi(item.idStrain, {
                        idStrain: item.idStrain,
                        quantity: apiInventory.data.quantity - 1,
                        price: apiInventory.data.price,
                        entryDate: apiInventory.data.entryDate
                    })
                    const newQuantity = listCartItem[i].quantityOfStrain + 1;
                    updateDetailCartApi(listCartItem[i].idCartDetail, { idStrain: listCartItem[i].idStrain, quantityOfStrain: newQuantity });
                    //cập nhật quantity
                    listCartItem[i].quantityOfStrain = newQuantity;
                    setListCartItem([...listCartItem]);
                    dispatch(setTotalAllProduct(totalAllProduct + 1))
                    return
                }
                else {
                    toastWarning('Kho đã hết hàng!', 'top-right')
                    return
                }
            }
        }
    }

    const decreaseQuantity = async (item) => {
        for (let i = 0; i < listCartItem.length; i++) {
            if (listCartItem[i].idCartDetail === item.idCartDetail) {
                if (listCartItem[i].quantityOfStrain > 1) {
                    const newQuantity = listCartItem[i].quantityOfStrain - 1;
                    updateDetailCartApi(listCartItem[i].idCartDetail, { idStrain: listCartItem[i].idStrain, quantityOfStrain: newQuantity });
                    //cập nhật quantity
                    listCartItem[i].quantityOfStrain = newQuantity;
                    setListCartItem([...listCartItem]);
                    dispatch(setTotalAllProduct(totalAllProduct - 1))
                    //tăng lại trong kho +1
                    const apiInventory = await getInventoryByIdStrainApi(item.idStrain)
                    updateInventoryByIdStrainApi(item.idStrain, {
                        idStrain: item.idStrain,
                        quantity: apiInventory.data.quantity + 1,
                        price: apiInventory.data.price,
                        entryDate: apiInventory.data.entryDate
                    })
                    return
                }
                else {
                    removeDetailCart(item) //có sử lý dispatch như trên rồi khỏi lo
                    return
                }
            }
        }
    }

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
        //set lại total product trong cart xong mới xóa
        dispatch(setTotalAllProduct(totalAllProduct - item.quantityOfStrain))
        await removeDetailCartApi(item.idCartDetail)
        //remove xong update lại cái giỏ hàng
        const listDetailCart = await getAllDetailCartApi(idCart)
        setListCartItem(listDetailCart.data)
        //tăng lại trong kho +1
        const apiInventory = await getInventoryByIdStrainApi(item.idStrain)
        updateInventoryByIdStrainApi(item.idStrain, {
            idStrain: item.idStrain,
            quantity: apiInventory.data.quantity + item.quantityOfStrain,
            price: apiInventory.data.price,
            entryDate: apiInventory.data.entryDate
        })
        // setReloadData(!reloadData);
        toast.dismiss()
        toastSuccess('Xoá thành công!', 'top-right')
    }
    //các loại payment: khinhanhang, momo, ...
    const handlePaymentMethod = () => {
        if (paymentMethod === 'khinhanhang') {
            navigate('/Payment')
        }
        else if (paymentMethod === 'momo') {
            navigate('/Payment')
        }
        else {
            navigate('/Payment')
        }
    }

    return (
        <div className='Cart'>
            {isLogin && listCartItem.length != 0 ?
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
                                    <p>{formatCurrency(tongTien)} VNĐ</p>
                                    <p>{formatCurrency(tongThue)} VNĐ</p>
                                    <p>{formatCurrency(thanhTien)} VNĐ</p>
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


                            <button className='btn-thanh-toan' onClick={handlePaymentMethod}>THANH TOÁN</button>

                            <p style={{ textAlign: 'center' }}>Hoặc</p>

                            <button className='btn-continue' onClick={() => { navigate('/Product/1') }}>TIẾP TỤC MUA SẮM</button>
                        </div>
                    </>
                )
                :
                <div>
                    {isLogin ?
                        <div className='non-login'>
                            <img className='img-empty-cart' src={images.emptycart} />
                            <h2 className='title'>Giỏ hàng của bạn không có sản phẩm nào</h2>
                            <p className='content'>Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng cả, hãy đến trang chủ và khám phá các sản phẩm của chúng tôi</p>
                            <button className='btn-login' onClick={() => navigate('/')}>Đi tới trang chủ</button>
                        </div>
                        :
                        <div className='non-login'>
                            <h2 className='title'>Vui lòng đăng nhập để sử dụng chức năng này</h2>
                            <button className='btn-login' onClick={() => navigate('/Login')}>Đăng nhập</button>
                        </div>
                    }
                </div>
            }

        </div >
    )
}

export default Cart
