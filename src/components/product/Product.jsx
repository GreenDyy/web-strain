import React, { useState, useEffect } from 'react'
import './Product.css'
import { images, icons } from '../../constants'
import ReactPaginate from 'react-paginate';
import { getAllStrainApi, getAllStrainNoPagingApi } from '../../apis/apiStrain'

const Item = ({ item }) => {
    //xử lý ảnh
    const imageSrc = item.imageStrain ? `data:image/jpeg;base64,${item.imageStrain}` : images.strainnull

    return (

        <div className='card-item'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={imageSrc} alt={item.scientificName} />
            </div>
            <h2 >{item.scientificName}</h2>
            <p style={{ fontSize: 14, fontWeight: 500 }}>Tình trạng: Có sẳn</p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='btn-cart'>Thêm vào giỏ hàng</button>
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
                console.log(data)
            }
        }
        fetchData()
    }, [search, sortBy, page])

    //paging

    return (
        <div className='Product'>

            <div style={{ display: 'flex', width: '100%' }}>
                {/* cột lọc */}
                <div style={{ flex: 12, flexDirection: 'column', border: '1px solid black' }}>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                </div>
                {/* cột ds strain */}
                <div style={{ flex: 88, flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', borderRadius: 20, backgroundColor: 'rgba(238, 238, 238, 0.13)' }}>
                    <h1 style={{ textAlign: 'center', color: 'black' }}>Danh sách Strain</h1>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {
                            data != [] ?
                                data.map((item, index) => (
                                    <Item key={index} item={item} />
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