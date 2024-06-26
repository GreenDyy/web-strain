import React, { useEffect, useState } from "react"
import './Payment.scss'
import { useDispatch, useSelector } from "react-redux"
import { FaEdit } from "react-icons/fa";
import { convertImageByte, formatCurrency, setDataLocalStorage } from "../../utils/Utils";
import { getInventoryByIdStrainApi } from "../../apis/apiInventory";
import { getAllDetailCartApi, removeDetailCartApi } from "../../apis/apiCart";
import { icons, images } from '../../constants'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addOrderDetailApi, createOrderApi, createPaymentUrlVNpayApi, sendMailOrderApi } from "../../apis/apiPayment";
import { setTotalAllProduct } from "../../srcRedux/features/cartSlice";
import { toastWarning } from "../Toast/Toast";
import Loading from "../loading/Loading";
import { useLocation } from 'react-router-dom';


const ItemProduct = ({ item }) => {
    const [price, setPrice] = useState(0)

    useEffect(() => {
        const fetchInventory = async () => {
            const response = await getInventoryByIdStrainApi(item.idStrain)
            const inventory = response.data;
            setPrice(inventory.price)
        };
        fetchInventory();
    }, [item.idStrain]);
    const imgSrc = item.idStrainNavigation.imageStrain ? convertImageByte(item.idStrainNavigation.imageStrain) : images.strainnull
    return (
        <div className="card-product">
            <div className="item-col-1">
                <img className="img-item" src={imgSrc} />
                <div className="wrap-content">
                    <p className="name">{item.idStrainNavigation.scientificName}</p>
                    <p className="price">{formatCurrency(price)} VNĐ</p>
                </div>
            </div>
            <div className="item-col-2">
                <p>x {item.quantityOfStrain}</p>
            </div>
        </div>
    )
}

function Payment() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const idCart = useSelector(state => state.customer.idCart)
    const customerData = useSelector(state => state.customer.customerData)
    const [dataListDetailCart, setDataListDetailCart] = useState([])
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('')
    const [tongTien, setTongTien] = useState(0)
    const [thanhTien, setThanhTien] = useState(0)
    const [tongThue, setTongThue] = useState(0)
    const [agree, setAgree] = useState(false)
    const [loading, setLoading] = useState(false)

    const location = useLocation();
    const paymentMethod = location.state?.paymentMethod || 'cod';

    useEffect(() => {
        const fetchDataDetailCart = async () => {
            const detailCarts = await getAllDetailCartApi(idCart)
            setDataListDetailCart(detailCarts.data)

        }
        fetchDataDetailCart()
    }, [idCart])

    useEffect(() => {
        setFullName(customerData.fullName)
        setPhoneNumber(customerData.phoneNumber)
        setEmail(customerData.email)
        setAddress(customerData.address)
    }, [customerData])

    useEffect(() => {
        const calculateTotal = async () => {
            let totalPrice = 0
            let totalTax = 0
            for (const item of dataListDetailCart) {
                const response = await getInventoryByIdStrainApi(item.idStrain)
                const inventory = response.data
                totalPrice += inventory.price * item.quantityOfStrain
                totalTax += (inventory.price * 0.1) * item.quantityOfStrain // tax 10%
            }
            setTongTien(totalPrice)
            setTongThue(totalTax)
            setThanhTien(totalPrice + totalTax)
        }
        calculateTotal()
    }, [dataListDetailCart])

    const changeInfor = () => {
        toast(
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ color: 'black' }}>Bạn có muốn thay đổi thông tin đăt hàng?</p>

                <div className='toast-confirm' style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='btn-cancel'
                        style={{ backgroundColor: '#00A551', color: 'white', borderRadius: 3, flex: 1, marginRight: 5 }}
                        onClick={() => confirmChangeInfor()}>Có</button>
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

    const confirmChangeInfor = () => {
        toast.dismiss()
        navigate('/Profile')
    }
    const handlePayOrder = async () => {
        if (dataListDetailCart.length != 0) {
            setLoading(true)
            if (address === null) {
                toastWarning('Vui lòng cập nhật địa chỉ giao hàng')
                setLoading(false)
                return
            }

            if (phoneNumber === null) {
                toastWarning('Vui lòng cập nhật số điện thoại')
                setLoading(false)
                return
            }

            if (email === null) {
                toastWarning('Vui lòng cập nhật email')
                setLoading(false)
                return
            }

            if (agree) {
                //thanh toán khi nhận hàng
                // const textPaymentMethod = paymentMethod === 'cod' ? 'COD'
                //     : (paymentMethod === 'vnpay' ? 'VNPAY'
                //         : (paymentMethod === 'momo' ? 'MOMO' : 'ZALOPAY'))
                const statusOrder = paymentMethod === 'cod' ? 'Chưa thanh toán' : 'Đã thanh toán'

                if (paymentMethod === 'cod') {
                    //tạo đơn

                    const newOrder = await createOrderApi(customerData.idCustomer, thanhTien, note, address, paymentMethod, statusOrder)
                    //tạo các detail đơn
                    for (const detailCart of dataListDetailCart) {
                        const inventory = await getInventoryByIdStrainApi(detailCart.idStrain);
                        const totalPriceOneProduct = detailCart.quantityOfStrain * inventory.data.price;
                        await addOrderDetailApi(newOrder.data.idOrder, detailCart.idStrain, detailCart.quantityOfStrain, totalPriceOneProduct);
                    }

                    //tạo bill
                    //xoá cart
                    for (const detailCart of dataListDetailCart) {
                        await removeDetailCartApi(detailCart.idCartDetail)
                    }
                    //gửi mail 
                    await sendMailOrderApi(newOrder.data.idOrder)
                    dispatch(setTotalAllProduct(0))
                    setDataLocalStorage('lastIdOrder', newOrder.data.idOrder)
                    navigate('/PaymentSuccess', { replace: true })
                    setLoading(false)
                }
                else if (paymentMethod === 'vnpay') {
                    //chuyển hướng tới VNPay
                    const requestModel = {
                        fullName: customerData?.fullName,
                        description: note,
                        amount: thanhTien,
                        orderId: (Math.floor(Math.random() * 9000) + 1000).toString()
                    }
                    const paymentUrl = await createPaymentUrlVNpayApi(requestModel)
                    window.location.href = paymentUrl.data

                    //gói các thông tin cần lưu vào local để tí dùng lại
                    setDataLocalStorage('dataOrder', {
                        idCustomer: customerData?.idCustomer,
                        thanhTien: thanhTien,
                        note: note,
                        address: address,
                        paymentMethod: paymentMethod,
                        statusOrder: statusOrder
                    })
                    setDataLocalStorage('dataListDetailCart', dataListDetailCart)
                    setLoading(false)
                }

                else {
                    toastWarning("Đang phát triển thêm tính năng")
                }

            }
            else {
                setLoading(false)
                toastWarning('Vui lòng đồng ý với các điều khoản thanh toán')
            }
        }
        else {
            setLoading(false)
            return
        }
    }

    return (
        <div className="Payment">
            <h1>Thông tin thanh toán</h1>
            <p>Vui lòng kiểm tra kỹ thông tin bên dưới trước khi thanh toán</p>
            <div className="row">
                <div className="col-1">
                    <div className="title">
                        <h2>Thông tin đặt hàng </h2>
                        <FaEdit className="icon-edit" onClick={changeInfor} />
                    </div>
                    <div className="wrap-all-input">
                        <div className="wrap-input">
                            <p className="label">Tên khách hàng</p>
                            <div className="input-box">
                                <input type="text" value={fullName} onChange={(event) => { setFullName(event.target.value) }} disabled />
                            </div>
                        </div>
                        <div className="wrap-input">
                            <p className="label">Email</p>
                            <div className="input-box">
                                <input type="text" value={email} onChange={(event) => { setEmail(event.target.value) }} disabled />
                            </div>
                        </div>
                        <div className="wrap-input">
                            <p className="label">Số điện thoại</p>
                            <div className="input-box">
                                <input type="text" value={phoneNumber} onChange={(event) => { setPhoneNumber(event.target.value) }} disabled />
                            </div>
                        </div>
                        <div className="wrap-input">
                            <p className="label">Địa chỉ giao hàng</p>
                            <div className="input-box">
                                <input type="text" value={address} onChange={(event) => { setAddress(event.target.value) }} />
                            </div>
                        </div>

                        <div className="wrap-input">
                            <p className="label">Ghi chú</p>
                            <div className="input-box">
                                <input type="text" value={note} onChange={(event) => { setNote(event.target.value) }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <h2>Danh sách sản phẩm</h2>
                    <div className="scroll-product">
                        {dataListDetailCart.map((item, index) =>
                            <ItemProduct key={index} item={item} />
                        )}
                    </div>
                    <div className="row-total-money tax">
                        <h4>Phương thức thanh toán</h4>
                        {paymentMethod === 'cod' &&
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={icons.cod} style={{ objectFit: 'contain', width: 30, height: 30, borderRadius: 5, marginRight: 5 }} />
                                <h4>Thanh toán khi nhận hàng(COD)</h4>
                            </div>}
                        {paymentMethod === 'vnpay' &&
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={icons.vnpay} style={{ objectFit: 'contain', width: 30, height: 30, borderRadius: 5, marginRight: 5 }} />
                                <h4>Cổng thanh toán VnPay</h4>
                            </div>}
                        {paymentMethod === 'momo' &&
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={icons.momo} style={{ objectFit: 'contain', width: 30, height: 30, borderRadius: 5, marginRight: 5 }} />
                                <h4>Ví điện tử MoMo</h4>
                            </div>}
                        {paymentMethod === 'zalopay' &&
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={icons.zalopay} style={{ objectFit: 'contain', width: 30, height: 30, borderRadius: 5, marginRight: 5 }} />
                                <h4>Ví điện tử ZaloPay</h4>
                            </div>}
                    </div>
                    <div className="row-total-money tax">
                        <h4>Tổng tiền</h4>
                        <h4>{formatCurrency(tongTien)} VNĐ</h4>
                    </div>
                    <div className="row-total-money tax">
                        <h4>Thuế</h4>
                        <h4>{formatCurrency(tongThue)} VNĐ</h4>
                    </div>
                    <div className="row-total-money total">
                        <h3>Thành tiền</h3>
                        <h3>{formatCurrency(thanhTien)} VNĐ</h3>
                    </div>
                </div>
            </div>
            <div className="wrap-btn">
                <label><input type="checkbox" onClick={() => setAgree(!agree)} /> Đồng ý với các điều khoản của chúng tôi <a>Điều khoản thanh toán</a></label>
                {paymentMethod === 'cod' && <button className="btn-submit" onClick={handlePayOrder} disabled={loading}>Thanh toán khi nhận hàng</button>}
                {paymentMethod === 'vnpay' && <button className="btn-submit" onClick={handlePayOrder} disabled={loading}>Thanh toán bằng VNPay</button>}
                {paymentMethod === 'momo' && <button className="btn-submit" onClick={handlePayOrder} disabled={loading}>Thanh toán bằng MoMo</button>}
                {paymentMethod === 'zalopay' && <button className="btn-submit" onClick={handlePayOrder} disabled={loading}>Thanh toán bằng ZaloPay</button>}
            </div>
            {loading && <Loading className='loading' />}
        </div>
    )
}

export default Payment
