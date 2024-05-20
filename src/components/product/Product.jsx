import React, { useState, useEffect } from 'react'
import './Product.css'
import { images, icons } from '../../constants'
import ReactPaginate from 'react-paginate';
import { getAllClassApi, getAllGenusApi, getAllPhylumApi, getAllSpeciesApi, getAllStrainApi } from '../../apis/apiStrain'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDetailCartApi, getAllDetailCartApi, updateDetailCartApi } from '../../apis/apiCart';
import { convertImageByte } from '../../utils/Utils';
import { toastError, toastSuccess } from '../Toast/Toast';
import { setTotalAllProduct } from '../../srcRedux/features/cartSlice'
import { IoIosArrowDropdown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";



const Item = ({ item, idCart, onClickToDetail, onClickAddToCart }) => {
    //xử lý ảnh
    const imageSrc = item.imageStrain ? convertImageByte(item.imageStrain) : images.strainnull

    return (

        <div className='card-item'>
            <div className='card-image' onClick={() => onClickToDetail(item.idStrain)}>
                <img className='image-strain' src={imageSrc} alt={item.scientificName} />
            </div>
            <h2 >{item.scientificName}</h2>
            <p style={{ fontSize: 14, fontWeight: 500 }}>Tình trạng: Có sẳn</p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='btn-cart' onClick={() => onClickAddToCart(idCart, item.idStrain)} >Thêm vào giỏ hàng</button>
                <button className='btn-buy'>Mua ngay</button>
            </div>
        </div>
    )
}
//MAIN-------
function Product() {
    const { pageRouter } = useParams();
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [isSearch, setIsSearch] = useState(false) //tìm cách sao mà search thì trả về page 1
    // const [page, setPage] = useState(2)
    const [totalPage, setTotalPage] = useState(0)

    //cột filter
    const [dataPhylum, setDataPhylum] = useState(null)
    const [dataClass, setDataClass] = useState(null)
    const [dataGenus, setDataGenus] = useState(null)
    const [dataSpecies, setDataSpecies] = useState(null)

    const [showPhylum, setShowPhylum] = useState(false)
    const [showClass, setShowClass] = useState(false)
    const [showGenus, setShowGenus] = useState(false)
    const [showSpecies, setShowSpecies] = useState(false)

    const [selectedPhylumId, setSelectedPhylumId] = useState(null);

    //redux
    const dispatch = useDispatch()
    const idCart = useSelector(state => state.customer.idCart)
    const totalAllProduct = useSelector(state => state.cart.totalAllProduct)
    const isLogin = useSelector(state => state.customer.isLogin)
    console.log('routePage:', pageRouter)

    const navigate = useNavigate()
    //get data strain
    useEffect(() => {
        const fetchData = async () => {
            try {
                //lấy data cho cột filter
                const dataPhylum = await getAllPhylumApi()
                const dataClass = await getAllClassApi()
                const dataGenus = await getAllGenusApi()
                const dataSpecies = await getAllSpeciesApi()

                const response = await getAllStrainApi(search, sortBy, pageRouter)

                setDataPhylum(dataPhylum.data)
                setDataClass(dataClass.data)
                setDataGenus(dataGenus.data)
                setDataSpecies(dataSpecies.data)

                setTotalPage(response.data[0]?.totalPage)
                setData(response.data);

                console.log(response.data)
            }
            catch (error) {
                console.log('Lỗi fetching data: ', error)
            }
        }
        fetchData()
    }, [search, sortBy, pageRouter])

    const handleGoToDetail = (idStrain) => {
        navigate(`/ProductDetail/${idStrain}`);
    }

    const handleAddToCart = async (idCart, idStrain) => {
        try {
            if (isLogin) {
                const listDetailCart = await getAllDetailCartApi(idCart)
                if (listDetailCart.data.length !== 0) {
                    // Kiểm tra xem idStrain của sản phẩm đã tồn tại trong giỏ hàng hay chưa
                    const curIndex = listDetailCart.data.findIndex(item => item.idStrain === idStrain);

                    if (curIndex !== -1) {
                        // Nếu idStrain đã tồn tại, cập nhật số lượng cho sản phẩm đó
                        updateDetailCartApi(listDetailCart.data[curIndex].idCartDetail, {
                            idCart: idCart,
                            idStrain: idStrain,
                            quantityOfStrain: listDetailCart.data[curIndex].quantityOfStrain + 1,
                        })
                        toastSuccess('Sản phẩm đã có trong giỏ hàng, + 1 số lượng', 'top-center')
                    } else {
                        addDetailCartApi(idCart, idStrain, 1)
                        toastSuccess('Thêm vào giỏ hàng thành công', 'top-center')
                    }
                }
                else {
                    addDetailCartApi(idCart, idStrain, 1)
                    toastSuccess('Thêm vào giỏ hàng thành công', 'top-center')
                }
                //dù thêm bằng cách nào thì cũng tăng 1
                dispatch(setTotalAllProduct(totalAllProduct + 1))
            }
            else {
                navigate('/Login')
            }


        } catch (error) {
            toastError('Thêm vào giỏ hàng thất bại, có lỗi xảy ra', 'top-center')
        }
    };

    const handlePhylumClick = (idPhylum) => {
        setSelectedPhylumId(idPhylum);
        setShowClass(true);
    };

    return (
        <div className='Product'>

            <div className='row-category-item'>
                {/* cột lọc */}
                <div className='col-category'>
                    <div className='search-box'>
                        <input className='input-search'
                            type='text'
                            placeholder='Search...'
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                        <button className='btn-search'>
                            <FaSearch className='icon-search' />
                        </button>

                    </div>
                    {/* show ds phylum */}
                    {/* {
                        dataPhylum?.map((item, index) => {
                            return (
                                <button key={index} className='btn-phylum' onClick={() => handlePhylumClick(item.idPhylum)}>
                                    <p>{item?.namePhylum}</p>
                                    <IoIosArrowDropdown className='icon-dropdown' />
                                </button>
                            );
                        })
                    }

                    {showClass && selectedPhylumId && (
                        <div className='wrap-class'>
                            {dataClass
                                .filter(item => item.idPhylum === selectedPhylumId)
                                .map((item, index) => (
                                    <button
                                        key={index}
                                        className='btn-class'
                                        onClick={() => setShowClass(false)}
                                    >
                                        <p>{item.className}</p>
                                        <IoIosArrowDropdown className='icon-dropdown' />
                                    </button>
                                ))}
                        </div>
                    )} */}

                    <ul className='tree'>
                        <li className='parent'>
                            <details>
                                <summary>Phylum 1</summary>
                                <ul>
                                    <li className='parent'>
                                        <details style={{display:'flex', flexDirection:'column'}}>
                                            <summary>Class 1</summary>
                                            <ul>
                                                <li className='parent'>
                                                    <details>
                                                        <summary>Genus 1</summary>
                                                        <ul>
                                                            <li>Species 1</li>
                                                            <li>Species 2</li>
                                                        </ul>
                                                    </details>
                                                </li>
                                                <li className='parent'>
                                                    <details>
                                                        <summary>Genus 2</summary>
                                                        <ul>
                                                            <li>Species 3</li>
                                                            <li>Species 4</li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li className='parent'>
                                        <details>
                                            <summary>Class 2</summary>
                                            <ul>
                                                <li className='parent'>
                                                    <details>
                                                        <summary>Genus 3</summary>
                                                        <ul>
                                                            <li>Species 5</li>
                                                            <li>Species 6</li>
                                                        </ul>
                                                    </details>
                                                </li>
                                                <li className='parent'>
                                                    <details>
                                                        <summary>Genus 4</summary>
                                                        <ul>
                                                            <li>Species 7</li>
                                                            <li>Species 8</li>
                                                        </ul>
                                                    </details>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li className='parent'>
                            <details>
                                <summary>Phylum 2</summary>
                                {/* Tương tự cho các phylum khác */}
                            </details>
                        </li>
                    </ul>


                </div>
                {/* cột ds strain */}
                <div className='col-all-item'>
                    <h1 style={{ textAlign: 'center', color: 'black' }}>Danh sách Strain</h1>

                    <div className='wrap-item'>
                        {
                            data.length !== 0 ?
                                data.map((item, index) => (
                                    <Item
                                        key={index}
                                        item={item}
                                        idCart={idCart}
                                        onClickToDetail={handleGoToDetail}
                                        onClickAddToCart={handleAddToCart} />
                                ))
                                :
                                <p>Đang load...</p>
                        }
                    </div>

                    {/* số trang */}

                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"

                        onPageChange={(event) => {
                            const selectedPage = event.selected;
                            navigate(`/Product/${selectedPage + 1}`);

                        }}
                        pageRangeDisplayed={5}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        pageClassName='btn-page'
                        // pageLinkClassName='btn-page'
                        activeClassName='btn-page-active'
                        previousClassName='btn-previous'
                        nextClassName='btn-next'
                    />
                </div>

            </div>

        </div>

    )
}

export default Product