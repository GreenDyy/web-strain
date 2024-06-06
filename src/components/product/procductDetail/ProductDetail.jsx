import React, { useEffect, useState } from "react";
import './ProductDetail.scss'
import { getClassByIdApi, getConditionByIdApi, getGenusByIdApi, getPhylumByIdApi, getRandomStrainApi, getSpeciesByIdApi, getStrainByIdApi } from "../../../apis/apiStrain";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { convertImageByte, formatCurrency } from "../../../utils/Utils";
import { getInventoryByIdStrainApi, updateInventoryByIdStrainApi } from "../../../apis/apiInventory";
import { useDispatch, useSelector } from "react-redux";
import { addDetailCartApi, getAllDetailCartApi, updateDetailCartApi } from "../../../apis/apiCart";
import { toastError, toastSuccess, toastWarning } from "../../Toast/Toast";
import { setTotalAllProduct } from "../../../srcRedux/features/cartSlice";
import Slider from "react-slick";
import { images } from "../../../constants";
import Loading from "../../loading/Loading";

const dataMota = 'Trong vi sinh vật học, "strain" thường được dịch là "dòng" hoặc "chủng", và nó đề cập đến một nhóm vi sinh vật có đặc điểm di truyền tương tự nhau. Các dòng vi sinh vật có thể khác nhau về các tính chất như khả năng gây bệnh, sức đề kháng kháng sinh, hoặc khả năng sản xuất các chất sinh học cụ thể.'
const dataReview = 'Trong ngữ cảnh của vi sinh vật học, "strain" không chỉ đơn thuần là một khái niệm mà còn là nền tảng cho sự hiểu biết và ứng dụng trong nhiều lĩnh vực khác nhau. Sự đa dạng của các strain mở ra cơ hội cho việc nghiên cứu sâu rộng và phát triển các giải pháp đa dạng cho các thách thức y tế và công nghiệp hiện đại'
const navbarTitle = [
    {
        id: 1,
        title: 'Mô tả',
    },
    {
        id: 2,
        title: 'Thông tin chi tiết',
    },
    {
        id: 1,
        title: 'Đánh giá',
    },
]

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [classes, setClasses] = useState(null);
    const [phylum, setPhylum] = useState(null);
    const [species, setSpecies] = useState(null);
    const [genus, setGenus] = useState(null);
    const [condition, setCondition] = useState()
    const [quantity, setQuantity] = useState(0) //tổng số sp còn trong kho
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(0)
    const [entryDate, setEntryDate] = useState('')
    const [dataRandomStrain, setDataRandomStrain] = useState([])
    const [loading, setLoading] = useState(false)

    //cho navbar con
    const [selectedNav, setSelectedNav] = useState(1)

    //redux
    const dispatch = useDispatch()
    const idCart = useSelector(state => state.customer.idCart)
    const totalAllProduct = useSelector(state => state.cart.totalAllProduct)
    const isLogin = useSelector(state => state.customer.isLogin)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiProduct = await getStrainByIdApi(id);
                const apiSpecies = await getSpeciesByIdApi(apiProduct.data.idSpecies)
                const apiGenus = await getGenusByIdApi(apiSpecies.data.idGenus)
                const apiClass = await getClassByIdApi(apiGenus.data.idClass)
                const apiPhylum = await getPhylumByIdApi(apiClass.data.idPhylum)
                const apiCondition = await getConditionByIdApi(apiProduct.data.idCondition)
                const apiInventory = await getInventoryByIdStrainApi(id)
                const apiRandomStrain = await getRandomStrainApi()

                setProduct(apiProduct.data)
                setSpecies(apiSpecies.data)
                setGenus(apiGenus.data)
                setClasses(apiClass.data)
                setPhylum(apiPhylum.data)
                setCondition(apiCondition.data)
                setQuantity(apiInventory.data.quantity)
                setPrice(apiInventory.data.price)
                setEntryDate(apiInventory.data.intryDate)
                setDataRandomStrain(apiRandomStrain.data)

            } catch (error) {
                console.error("Lỗi fetch data trong productdetail:", error);
            }
        };
        fetchData();
    }, [id]);

    const increaseCount = () => {
        if (count < quantity) {
            setCount(count + 1)

        }
        if (quantity === 0) {
            toastWarning('Sản phẩm đã hết hàng!', 'top-right')
        }
    }

    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1)

        }
    }

    const handleAddToCart = async () => {
        try {
            if (isLogin) {
                {
                    if (count > 0) {
                        console.log('count', count)
                        const listDetailCart = await getAllDetailCartApi(idCart)
                        console.log('kis catr ne:', listDetailCart.data)
                        console.log('id:', id)
                        if (listDetailCart.data.length !== 0) {
                            // Kiểm tra xem idStrain của sản phẩm đã tồn tại trong giỏ hàng hay chưa
                            const curIndex = listDetailCart.data.findIndex(item => String(item.idStrain) === String(id));


                            if (curIndex !== -1) {
                                // Nếu idStrain đã tồn tại, cập nhật số lượng cho sản phẩm đó
                                updateDetailCartApi(listDetailCart.data[curIndex].idCartDetail, {
                                    idCart: idCart,
                                    idStrain: id,
                                    quantityOfStrain: listDetailCart.data[curIndex].quantityOfStrain + count,
                                })

                                toastSuccess(`Sản phẩm đã có trong giỏ hàng, + ${count} số lượng`, 'top-center')
                            } else {
                                addDetailCartApi(idCart, id, count)
                                toastSuccess('Thêm vào giỏ hàng thành công', 'top-center')
                            }
                        }
                        else {
                            addDetailCartApi(idCart, id, count)
                            toastSuccess('Thêm vào giỏ hàng thành công', 'top-center')
                        }
                        //dù thêm bằng cách nào thì cũng tăng 1 và trừ kho
                        updateInventoryByIdStrainApi(id, {
                            idStrain: id,
                            quantity: quantity - count,
                            price: price,
                            entryDate: entryDate
                        })
                        dispatch(setTotalAllProduct(totalAllProduct + count))
                        setQuantity(quantity - count)
                        setCount(0)
                    }
                    else {
                        toastWarning('Vui lòng chọn số lượng', 'top-right')
                    }
                }
            }
            else {
                navigate('/Login')
            }


        } catch (error) {
            toastError('Thêm vào giỏ hàng thất bại, có lỗi xảy ra', 'top-center')
        }
    };

    const handleGoToDetail = (idStrain) => {
        navigate(`/ProductDetail/${idStrain}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className="ProductDetail">
            {product ? (
                <div className="main">
                    <div className="wrap-row-1">
                        <div className="wrap-image">
                            {/* <img className="image-item" src="https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg" alt="image-item" /> */}
                            <img className="image-item" src={product?.imageStrain ? convertImageByte(product?.imageStrain) : images.strainnull} />
                            <div className="slide">
                            </div>
                        </div>

                        <div className="wrap-content">
                            <h2 className="title">{product?.scientificName} - {product?.strainNumber}</h2>
                            <div className="wrap-price">
                                <p className="price1">{formatCurrency(price)} {"VNĐ -"}</p>
                                <p className="price2"> {formatCurrency(price)} {"VNĐ"}</p>
                            </div>
                            <div className="all-star">
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star" />
                            </div>
                            <p className="des">
                                Blue Dream is known for its well-rounded effects that combine the best of both indica and sativa. Users often report an initial cerebral rush, characterized by euphoria and increased focus, thanks to its Haze genetics. This is followed by a relaxing body high that helps ease tension without causing heavy sedation. This balance makes Blue Dream suitable for daytime use and a favorite among those looking for relief without heavy drowsiness.
                            </p>
                            <div className="wrap-all-btn">
                                <div className="wrap-btn-amount">
                                    <button className="btn-decrease" onClick={decreaseCount}>-</button>
                                    <input
                                        className="input-number"
                                        type="text"
                                        value={count}
                                        onChange={(event) => { setCount(event.target.value) }}
                                    />
                                    <button className="btn-increase" onClick={increaseCount} >+</button>
                                </div>

                                <button className="btn-add-cart" onClick={handleAddToCart}>
                                    <p>Thêm vào giỏ hàng</p>
                                </button>
                            </div>

                            <div className="wish-list">
                                <FaRegHeart className="heart" />
                                <p className="text">Thêm vào danh sách ước</p>
                            </div>

                            <div className="wrap-des">
                                <div className="wrap-des-col-1">
                                    <p className="head">Former name: <span className="body">{product?.formerName}</span></p>
                                    <p className="head">Common name: <span className="body">{product?.commonName}</span></p>
                                    <p className="head">Cell size: <span className="body">{product?.cellSize}</span></p>
                                </div>

                                <div className="wrap-des-col-2">
                                    <p className="head">Collection site: <span className="body">{product?.collectionSite}</span></p>
                                    <p className="head">Continent: <span className="body">{product?.continent}</span></p>
                                    <p className="head">Country: <span className="body">{product?.country}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wrap-row-2">
                        <div className="navbar">
                            {navbarTitle.map((item, index) => {
                                return (
                                    <button key={index} className="btn-nav" onClick={() => { setSelectedNav(item.id) }}>{item.title}</button>
                                )
                            })}
                        </div>

                        <div className="nav-content">
                            {
                                selectedNav === 1 && (
                                    dataMota
                                )

                            }
                            {
                                selectedNav === 2 && (
                                    <div className="table-detail">
                                        <div className="table-title">
                                            <p>Thông tin chi tiết</p>
                                        </div>

                                        <div className="table-content">
                                            <div className="table-col-1">
                                                <div className="cell">
                                                    <p>Điều kiện sống</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Strain number</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Species</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Class</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Genus</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Phylum</p>
                                                </div>

                                                <div className="cell">
                                                    <p>scientificName</p>
                                                </div>
                                                <div className="cell">
                                                    <p>synonymStrain</p>
                                                </div>
                                                <div className="cell">
                                                    <p>formerName</p>
                                                </div>
                                                <div className="cell">
                                                    <p>commonName</p>
                                                </div>
                                                <div className="cell">
                                                    <p>cellSize</p>
                                                </div>
                                                <div className="cell">
                                                    <p>organization</p>
                                                </div>

                                                <div className="cell">
                                                    <p>characteristics</p>
                                                </div>
                                                <div className="cell">
                                                    <p>collectionSite</p>
                                                </div>
                                                <div className="cell">
                                                    <p>continent</p>
                                                </div>
                                                <div className="cell">
                                                    <p>country</p>
                                                </div>

                                                <div className="cell">
                                                    <p>isolationSource</p>
                                                </div>
                                                <div className="cell">
                                                    <p>toxinProducer</p>
                                                </div>
                                                <div className="cell">
                                                    <p>stateOfStrain</p>
                                                </div>
                                                <div className="cell">
                                                    <p>agitationResistance</p>
                                                </div>
                                                <div className="cell">
                                                    <p>remarks</p>
                                                </div>
                                            </div>

                                            <div className="table-col-2">
                                                <div className="cell">
                                                    <p>{condition?.medium} {condition?.temperature} {condition?.lightIntensity} {condition?.duration}   </p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.strainNumber}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{species?.nameSpecies}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{classes?.nameClass}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{genus?.nameGenus}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{phylum?.namePhylum}</p>
                                                </div>

                                                <div className="cell">
                                                    <p>{product?.scientificName}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.synonymStrain}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.formerName}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.commonName}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.cellSize}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.organization}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.characteristics}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.collectionSite}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.continent}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.country}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.isolationSource}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.toxinProducer}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.stateOfStrain}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.agitationResistance}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.remarks}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }
                            {
                                selectedNav === 3 && (
                                    dataReview
                                )

                            }
                        </div>
                    </div>

                    <div className="wrap-row-3">
                        <h2 className="title">Các sản phẩm liên quan</h2>
                        <div className="wrap-other-strain">
                            {dataRandomStrain.map((item, index) => {
                                const imgSrc = item?.imageStrain ? convertImageByte(item.imageStrain) : images.strainnull
                                return (
                                    <div key={index} className="item-strain" onClick={() => { handleGoToDetail(item.idStrain) }}>
                                        <img className="img-strain" src={imgSrc} />
                                        <p className="name-strain">{item.scientificName}</p>
                                    </div>

                                )
                            })}

                        </div>
                    </div>
                </div>
            ) : (
                <div className="wrap-loading">
                    <Loading />
                </div>

            )}
        </div>
    );
}

export default ProductDetail;
