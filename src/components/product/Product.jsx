import React, { useState, useEffect } from 'react'
import './Product.css'
import axios from 'axios'

import { images, API } from '../../constants/constants'
// https://jsonplaceholder.typicode.com/posts

const Item = ({ item }) => (
    <div className='card-item'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={images.mario} alt="mario nè" />
        </div>
        <h2 >{item.gameName}</h2>
        <p style={{ color: 'green' }}>{item.price} $</p>
        <p>{item.description}</p>
    </div>
)

function Product() {
    const [data, setData] = useState(null)
    // useEffect(() => {
    //     const getData = async () => {
    //         await axios.get(API.dataAll)
    //             .then((result) => setData(result.data))
    //     }
    //     getData()
    // }, [])
    // console.log(data)
    return (
        <div className='Product'>
            <h1 style={{ textAlign: 'center', color: 'black' }}>Danh sách Strain</h1>
            <div style={{ display: 'flex' }}>
                {/* cột lọc */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 12, border: '1px solid black' }}>
                    <button>mấy nút này để lọc</button>

                </div>
                {/* cột ds strain */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', flex: 88 }}>
                    {/* card old*/}
                    <div className='card-item'>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://img.freepik.com/free-vector/product-card-design-template_23-2149687359.jpg" alt="mario nè" />
                        </div>
                        <h2 >Acanthamoeba castellanii</h2>
                        <p>Tình trạng: Có sẳn</p>

                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <button className='btn-cart'>Thêm vào giỏ hàng</button>
                            <button className='btn-buy'>Mua ngay</button>
                        </div>
                    </div>

                    

                    {/* //API */}
                    {/* {
                        data ?
                            data.slice(0, 6).map((item, index) => (
                                <Item key={index} item={item} />
                            ))
                            :
                            <p>Đang load</p>
                    } */}

                    
                </div>
            </div>

        </div>

    )
}

export default Product