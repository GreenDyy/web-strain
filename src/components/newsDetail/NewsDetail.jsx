import React, { useEffect, useState } from 'react'
import './NewsDetail.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { getGetRandomNewsPaperApi, getNewsPaperByIdApi } from '../../apis/apiNewspaper'
import { getEmployeeByIdApi } from '../../apis/apiLoginEmployee'
import { convertImageByte, formatDate } from '../../utils/Utils'

function NewsDetail() {
    const { idNewspaper } = useParams()
    const [newspaper, setNewspaper] = useState(null)
    const [author, setAuthor] = useState('')
    const [newsNoiBats, setNewsNoiBats] = useState([])
    const [newsLienQuans, setNewsLienQuans] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const newspaper = await getNewsPaperByIdApi(idNewspaper)
            const employee = await getEmployeeByIdApi(newspaper?.data?.idEmployee)
            setNewspaper(newspaper.data)
            setAuthor(employee.data.fullName)
            const randomNews = await getGetRandomNewsPaperApi()
            setNewsNoiBats(randomNews.data)
            setNewsLienQuans(randomNews.data.slice(0, 3))
        }
        fetchData()
    }, [idNewspaper])

    const handleGoToDetail = (idNewspaper) => {
        navigate(`/NewsDetail/${idNewspaper}`)
        window.scrollTo({ top: 0 })
    }
    return (
        <div className='NewsDetail'>
            <div className='col-1-news'>
                <h1 className='title-news'>{newspaper?.title}</h1>
                <p className='post-date'>Ngày đăng: {formatDate(newspaper?.postDate)}</p>
                <p className='content-news'>{newspaper?.content}</p>
                <img src={newspaper?.image ? convertImageByte(newspaper?.image) : 'https://e.khoahoc.tv/photos/image/2016/11/08/vi-khuan-t-103.jpg'} />
                <p className='content-news' style={{ marginTop: 15 }}>{newspaper?.content2}</p>
                <p className='author'>Tác giả: {author && author}</p>

                <h2 className='title-lien-quan'>BÀI BÁO LIÊN QUAN</h2>
                {newsLienQuans?.map((item, index) => {
                    console.log(item)
                    return (
                        <div key={index} className='wrap-news'>
                            <img className='thumbnail' src={item?.image ? convertImageByte(item?.image) : 'https://e.khoahoc.tv/photos/image/2016/11/08/vi-khuan-t-103.jpg'} />
                            <p onClick={() => handleGoToDetail(item?.idNewspaper)}>{item?.title}</p>
                        </div>
                    )
                })}
            </div>

            <div className='col-2-news'>

                <h3>TIN TỨC NỔI BẬT</h3>

                <div className='wrap-all-news'>
                    {newsNoiBats?.map((item, index) => {
                        return (
                            <div key={index} className='wrap-news'>
                                <img className='thumbnail' src={item?.image ? convertImageByte(item?.image) : 'https://e.khoahoc.tv/photos/image/2016/11/08/vi-khuan-t-103.jpg'} />
                                <p style={{ cursor: 'pointer' }} onClick={() => handleGoToDetail(item?.idNewspaper)}>{item?.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewsDetail