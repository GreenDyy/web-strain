import React, { useEffect, useState } from 'react'
import './NewsPaper.scss'
import { images } from '../../constants'
import { getAllNewsPaperApi } from '../../apis/apiNewspaper'
import { useNavigate } from 'react-router-dom'
import { convertImageByte } from '../../utils/Utils'

const NewsPaperItem = ({ item, onClick }) => {
    const day = new Date(item?.postDate).getDate().toString().padStart(2, '0')
    const month = (new Date(item?.postDate).getMonth() + 1).toString().padStart(2, '0')
    const year = new Date(item?.postDate).getFullYear()
    return (
        <div className='project-item'>
            <div className='card-text'>
                <p className='date'>Ngày {day} tháng {month} năm {year}</p>
                <h2 className='title'>{item?.title}</h2>
                <p className='des'>{item?.content}</p>
                <button className='btn-read' onClick={onClick}>ĐỌC THÊM</button>
            </div>

            <div className='card-image'>
                <img src={item?.image ? convertImageByte(item?.image) : 'https://e.khoahoc.tv/photos/image/2016/11/08/vi-khuan-t-103.jpg'} className='card-img' />
            </div>
        </div>
    )
}

const NewsPaper = () => {
    const navigate = useNavigate()
    const [newspapers, setNewspapers] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const newspapers = await getAllNewsPaperApi()
            setNewspapers(newspapers.data)
        }
        fetchData()
    }, [])

    const handleGoToDetail = (idNewspaper) => {
        navigate(`/NewsDetail/${idNewspaper}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <div className='NewsPaper'>
            <div className="row-banner">
                <img className="banner" src={images.bannernewspaper} />
            </div>

            <h1 className='header-newspaper'>TIN TỨC VỀ CHỦNG</h1>

            <div className='wrap-all-paper'>
                {newspapers?.map((item, index) => {
                    return (
                        <NewsPaperItem key={index} item={item} onClick={() => handleGoToDetail(item?.idNewspaper)} />
                    )
                })}
            </div>
        </div>
    )
}

export default NewsPaper
