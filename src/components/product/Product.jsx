import React, { useState, useEffect } from 'react'
import './Product.css'
import axios from 'axios'
import API from '../../api/api'
// import { images, icons } from '../../constants'

const Item = ({ item }) => {
    const imageSrc = `data:image/jpeg;base64,${item.image_Strain}`;
    return (

        <div className='card-item'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={imageSrc} alt={item.scientific_Name} />
            </div>
            <h2 >{item.scientific_Name}</h2>
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
    const [page, setPage] = useState(4)
    const [totalPage, setTotalPage] = useState(0)

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
                setTotalPage(response.headers['x-total-count']); // Lấy tổng số trang từ header
            }
            catch (error) {
                console.log('Lỗi fetching data: ', error)
            }
        }
        fetchData()
    }, [])
    console.log(data)
    return (
        <div className='Product'>
            <h1 style={{ textAlign: 'center', color: 'black' }}>Danh sách Strain</h1>
            <div style={{ display: 'flex' }}>
                {/* cột lọc */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 12, border: '1px solid black', alignItems: 'center' }}>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                </div>
                {/* cột ds strain */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', flex: 88 }}>
                    {
                        data ?
                            data.slice(0, 12).map((item, index) => (
                                <Item key={index} item={item} />
                            ))
                            :
                            <p>Đang load...</p>
                    }
                </div>
            </div>

        </div>

    )
}

export default Product