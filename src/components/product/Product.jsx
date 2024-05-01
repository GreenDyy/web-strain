import React, { useState, useEffect } from 'react'
import './Product.css'
import axios from 'axios'
import API from '../../api/api'
import { images, icons } from '../../constants'
import ReactPaginate from 'react-paginate';

const Item = ({ item }) => {
    const imageSrc = `data:image/jpeg;base64,${item.imageStrain}`;
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
                const response = await axios.get(API.getAllStrain, {
                    params: {
                        search: search,
                        sortBy: sortBy,
                        page: page
                    }
                });
                setData(response.data);
                setTotalPage(response.data[0].totalPage)
            }
            catch (error) {
                console.log('Lỗi fetching data: ', error)
            }
        }
        fetchData()
    })

    //paging

    return (
        <div className='Product'>

            <div style={{ display: 'flex', width: '100%' }}>
                {/* cột lọc */}
                <div style={{flex: 12, flexDirection: 'column', border: '1px solid black', alignItems: 'center'}}>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                </div>
                {/* cột ds strain */}
                <div style={{ flex: 88, flexWrap:'wrap', flexDirection: 'column', justifyContent: 'center', border: '1px solid red' }}>
                    <h1 style={{ textAlign: 'center', color: 'black' }}>Danh sách Strain</h1>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {
                            data ?
                                data.map((item, index) => (
                                    <Item key={index} item={item} />
                                ))
                                :
                                <p>Đang load...</p>
                        }
                    </div>
                    {/* số trang */}
                    {/* {
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                            <button className='btn-previous'>
                                <img src={icons.previous} />
                                <p>Trang trước</p>
                            </button>
                            {[...Array(totalPage)].map((_, index) => (
                                <button
                                    key={index}
                                    className='btn-page'
                                    style={{ background: (page == index + 1) && 'red' }}
                                    onClick={()=>setPage(index+1)}>
                                    <p>{index + 1}</p>
                                </button>
                            ))}
                               <button className='btn-next'>
                               <p>Trang sau</p>
                                <img src={icons.previous} />
     
                            </button>
                        </div>
                    } */}

                    {/* new */}
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