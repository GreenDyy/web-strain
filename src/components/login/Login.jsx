import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import { checkExistEmailApi, loginCustomerApi, loginCustomerWithGoogleApi, registerCustomerApi } from "../../apis/apiLogin";
import { getAllTotalQuantityApi, getCartByIdCustomerApi } from "../../apis/apiCart";
import { toastError, toastWarning } from "../Toast/Toast";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { icons } from '../../constants'
import { jwtDecode } from "jwt-decode";

//redux
import { useDispatch } from "react-redux";
import { login } from "../../srcRedux/features/customerSlice";
import { setTotalAllProduct } from "../../srcRedux/features/cartSlice";
import { HashLoader } from "react-spinners";
import { getDataLocalStorage, removeDataLocalStorage, setDataLocalStorage } from "../../utils/Utils";

function Login() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState(getDataLocalStorage('rememberUserName') || '')
    const [password, setPassword] = useState(getDataLocalStorage('rememberPassword') || '')
    const [spinner, setSpinner] = useState(false)
    const [rememberPass, setRememberPass] = useState(getDataLocalStorage('rememberPassword') ? true : false)

    useEffect(() => {
        if (rememberPass) {
            setDataLocalStorage('rememberUserName', username)
            setDataLocalStorage('rememberPassword', password)
        }
        else {
            removeDataLocalStorage('rememberUserName')
            removeDataLocalStorage('rememberPassword')
        }
    }, [rememberPass])

    const navigate = useNavigate();

    const handleLogin = async () => {
        setSpinner(true)
        if (!username || !password) {
            toastWarning('Vui lòng nhập đầy đủ thông tin')
            setSpinner(false)
            return;
        }
        try {
            const user = await loginCustomerApi(username, password)

            // if (response?.token) {
            //     localStorage.setItem('token', response.token)
            // }

            if (user.data) {
                const cart = await getCartByIdCustomerApi(user.data.idCustomer)
                const allTotalProductInCart = await getAllTotalQuantityApi(cart.data.idCart)
                //lưu vào redux
                dispatch(login({
                    customerData: user.data,
                    idCart: cart.data.idCart
                }))
                dispatch(setTotalAllProduct(allTotalProductInCart.data));
                navigate('/Home', { replace: true })
            }
            else {
                setSpinner(false)
                toastError("Sai tên tài khoản hoặc mật khẩu")
            }
        }
        catch (e) {
            setSpinner(false)
            toastError("Sai tên tài khoản hoặc mật khẩu")
        }
    }

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
        console.log('Thông tin từ Google:', credentialResponseDecoded);

        // Trích xuất thông tin cần thiết
        const { email, family_name, given_name, picture } = credentialResponseDecoded;
        console.log('ten', family_name)
        //check email
        const checkMail = await checkExistEmailApi(email)
        //mail tồn tại thì login
        if (checkMail.data.status === 1) {
            setSpinner(false)
            try {
                const user = await loginCustomerWithGoogleApi(email)

                if (user.data) {
                    const cart = await getCartByIdCustomerApi(user.data.idCustomer)
                    const allTotalProductInCart = await getAllTotalQuantityApi(cart.data.idCart)
                    //lưu vào redux
                    dispatch(login({
                        customerData: user.data,
                        idCart: cart.data.idCart
                    }))
                    dispatch(setTotalAllProduct(allTotalProductInCart.data));
                    navigate('/Home', { replace: true })
                }
                else {
                    setSpinner(false)
                    toastError("Sai tên tài khoản hoặc mật khẩu")
                }
            }
            catch (e) {
                setSpinner(false)
                toastError("Sai tên tài khoản hoặc mật khẩu")
            }

        }
        //mail ko tồn tại thì register
        else {
            try {
                const response = await fetch(picture);
                const blob = await response.blob();
                const imageBinary = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const result = reader.result?.toString().split(',')[1];
                        resolve(result);
                    };
                    reader.onerror = reject;
                });

                //register
                const dataRegister = await registerCustomerApi({
                    firstName: given_name,
                    lastName: family_name,
                    fullName: given_name + family_name,
                    dateOfBirth: null,
                    gender: 'Nam',
                    email: email,
                    phoneNumber: null,
                    address: null,
                    image: imageBinary,
                    username: email,
                    password: 'loginwithgoogle',
                    status: "Đang hoạt động"
                })
                //nếu đăng ký thành công thì cho login
                if (dataRegister.status == 200) {
                    const user = await loginCustomerWithGoogleApi(email)
                    const cart = await getCartByIdCustomerApi(user.data.idCustomer)
                    const allTotalProductInCart = await getAllTotalQuantityApi(cart.data.idCart)
                    //lưu vào redux
                    dispatch(login({
                        customerData: user.data,
                        idCart: cart.data.idCart
                    }))
                    dispatch(setTotalAllProduct(allTotalProductInCart.data));
                    navigate('/Home', { replace: true })
                }
                else {
                    toastError("Lỗi đăng nhập, status 500")
                }

            } catch (e) {
                console.log(e);
                toastError("Lỗi đăng ký status 500")
            }
        }
    }

    const handleGoogleLoginError = () => {
        console.log('Đăng nhập bằng Google thất bại');
    };

    return (
        <div className="Login">
            <form>
                <h1>Đăng nhập</h1>
                <div>
                    <div className="input-box">
                        <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className="icon" />
                    </div>
                </div>

                <div className="remember-forgot">
                    <label> <input type="checkbox" value={rememberPass} onChange={() => setRememberPass(!rememberPass)} checked={rememberPass} />Nhớ mật khẩu</label>
                    <Link to='/ForgetPass'>Quên mật khẩu</Link>
                </div>

                <button className="btn-login"
                    type="button" onClick={handleLogin}>Đăng nhập</button>
                <HashLoader
                    color="white"
                    loading={spinner}
                    size={20}
                    cssOverride={{ position: 'absolute', right: 198, bottom: 100 }}
                />
                <p className="register-link">Hoặc đăng nhập với</p>
                {/* <div className="btn-google" onClick={handleCustomGoogleLogin}>
                    <img src={icons.google} />
                    <p>Đăng nhập với Google</p>
                </div> */}
                <div className="btn-google">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        shape="pill"
                        size="medium"
                    />
                </div>


                <div className="register-link">
                    <p>Chưa có tài khoản? <Link to='/Register'>Đăng ký ngay!</Link></p>
                </div>
            </form>
        </div>
    )
}
export default Login