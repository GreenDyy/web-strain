import React, { useState, useEffect } from 'react'
import './Product.css'
import axios from 'axios'
import { images, API } from '../../constants/constants'

const MockData = [
    {
        name: 'Axios',
        image: 'https://ysm-res.cloudinary.com/image/upload/ar_16:9,c_fill,dpr_3.0,f_auto,g_faces:auto,q_auto:eco,w_500/v1/yms/prod/5e80942d-d5b7-43cb-9ec8-aad53f6d2f73'
    },
    {
        name: 'Kratos',
        image: 'https://live-production.wcms.abc-cdn.net.au/649edd7691e0067d07dc74c1c3ae534e?impolicy=wcms_crop_resize&cropH=1620&cropW=2435&xPos=325&yPos=17&width=862&height=575'
    },
    {
        name: 'Zeus',
        image: 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Feb031a9d-8e22-45f3-becb-0aed3b5081b2.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1'
    },
    {
        name: 'Athena',
        image: 'https://static01.nyt.com/images/2020/09/14/opinion/14Holmes/10Holmes-articleLarge.jpg?quality=75&auto=webp&disable=upscale'
    },
    {
        name: 'Hera',
        image: 'https://images.theconversation.com/files/383677/original/file-20210211-16-pta7i2.jpg?ixlib=rb-4.1.0&rect=7%2C0%2C4985%2C3383&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip',
    },
    {
        name: 'Quân',
        image: 'https://m.media-amazon.com/images/I/51Fi+kI0OwL.jpg'
    },
    {
        name: 'T.Anh',
        image: 'https://static.euronews.com/articles/stories/07/28/86/88/1200x675_cmsv2_271462ba-9d4b-5094-be61-271fb17689b4-7288688.jpg'
    },
    {
        name: 'Artemis',
        image: 'https://assets.medpagetoday.net/media/images/103xxx/103862.jpg?width=0.8'
    },
]


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
                <div style={{ display: 'flex', flexDirection: 'column', flex: 12, border: '1px solid black', alignItems:'center' }}>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                    <button className='btn-filter' >mấy nút này để lọc</button>
                </div>
                {/* cột ds strain */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', flex: 88 }}>
                    {/* card old*/}
                    {
                        MockData.map((item, index) => {
                            return (
                                <div key={index} className='card-item'>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={item.image} alt={item.image}/>
                                    </div>
                                    <h2 >{item.name}</h2>
                                    <p style={{ fontSize: 14, fontWeight: 500 }}>Tình trạng: Có sẳn</p>

                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button className='btn-cart'>Thêm vào giỏ hàng</button>
                                        <button className='btn-buy'>Mua ngay</button>
                                    </div>
                                </div>
                            )

                        })
                    }



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