import React, { useState, useEffect } from 'react'
import './Product.css'
import { images, icons } from '../../constants'
import ReactPaginate from 'react-paginate';
import { getAllStrainApi, getAllStrainNoPagingApi } from '../../apis/apiStrain'
import { useNavigate } from 'react-router-dom';
import { addDetailCart, getAllDetailCart } from '../../apis/apiCart';
import { getDataLocalStorage, setDataLocalStorage } from '../../utils/Utils';

const Item = ({ item, idCart, onClickToDetail, onClickAddToCart }) => {
    //xử lý ảnh
    const imageSrc = item.imageStrain ? `data:image/jpeg;base64,${item.imageStrain}` : images.strainnull

    return (

        <div className='card-item'>
            <div className='img-item' onClick={() => onClickToDetail(item.idStrain)}>
                <img src={imageSrc} alt={item.scientificName} />
            </div>
            <h2 >{item.scientificName}</h2>
            <p style={{ fontSize: 14, fontWeight: 500 }}>Tình trạng: Có sẳn</p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='btn-cart' onClick={() => onClickAddToCart(idCart, item.idStrain, 1)} >Thêm vào giỏ hàng</button>
                <button className='btn-buy'>Mua ngay</button>
            </div>
        </div>
    )
}

function Product() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);

    const [idCart, setIdCart] = useState(getDataLocalStorage('idCart') ? getDataLocalStorage('idCart') : null)

    const navigate = useNavigate()
    //get data strain
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllStrainApi(search, sortBy, page)
                setData(response.data);
                setTotalPage(response.data[0].totalPage)
            }
            catch (error) {
                console.log('Lỗi fetching data: ', error)
            }
        }
        fetchData()
    }, [search, sortBy, page])

    //paging

    const handleGoToDetail = (idStrain) => {
        navigate(`/ProductDetail/${idStrain}`);
        // navigate('/ProductDetail')
    }

    const handleAddToCart = async (idCart, idStrain, quantityOfStrain) => {
        try {
            // Lấy danh sách sản phẩm trong giỏ hàng từ localStorage
            // const listDetailCart = await getDataLocalStorage('cart').data;
            const listDetailCart = await getAllDetailCart(idCart)
            console.log('list cart nè: ', listDetailCart.data)
            if (listDetailCart.data.length != 0) {
                // Kiểm tra xem idStrain của sản phẩm đã tồn tại trong giỏ hàng hay chưa
                const curIndex = listDetailCart.data.findIndex(item => item.idStrain === idStrain);

                if (curIndex !== -1) {
                    // Nếu idStrain đã tồn tại, cập nhật số lượng cho sản phẩm đó
                    // const listDetailCartNew = [...listDetailCart];
                    // listDetailCartNew[curIndex].quantityOfStrain += quantityOfStrain;
                    // setListCartItem(listDetailCartNew);
                    // setDataLocalStorage('cart', listDetailCartNew);
                    alert('Sản phẩm đã có trong giỏ hàng')
                } else {
                    // Nếu idStrain chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                    // const newCartItem = {
                    //     idStrain: idStrain,
                    //     quantityOfStrain: quantityOfStrain
                    // };
                    // const listDetailCartNew = [...listDetailCart, newCartItem];
                    // setListCartItem(listDetailCartNew);
                    addDetailCart(idCart, idStrain, quantityOfStrain)
                    // setDataLocalStorage('cart', listDetailCartNew);
                    alert('Thêm vào giỏ hàng thành công');
                }

              
            }
            else {
                addDetailCart(idCart, idStrain, quantityOfStrain)
                alert('Thêm vào giỏ hàng thành công');
            }


        } catch (error) {
            console.log('Thêm vào giỏ hàng thất bại:', error);
            alert('Thêm vào giỏ hàng thất bại');
        }
    };


    return (
        <div className='Product'>

            <div className='row-category-item'>
                {/* cột lọc */}
                <div className='col-category'>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                </div>
                {/* cột ds strain */}
                <div className='col-all-item'>
                    <h1 style={{ textAlign: 'center', color: 'black' }}>Danh sách Strain</h1>
                    <div className='wrap-item'>
                        {
                            data != [] ?
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
                        onPageChange={(selectedPage) => setPage(selectedPage.selected + 1)}
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