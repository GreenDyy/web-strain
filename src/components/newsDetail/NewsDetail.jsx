import React, { useEffect, useState } from 'react'
import './NewsDetail.scss'
import { useParams } from 'react-router-dom'
import { getGetRandomNewsPaperApi, getNewsPaperByIdApi } from '../../apis/apiNewspaper'
import { getEmployeeByIdApi } from '../../apis/apiLoginEmployee'
import { formatDate } from '../../utils/Utils'

function NewsDetail() {
    const { idNewspaper } = useParams()
    const [newspaper, setNewspaper] = useState(null)
    const [author, setAuthor] = useState('')
    const [newsNoiBats, setNewsNoiBats] = useState([])
    const [newsLienQuans, setNewsLienQuans] = useState([])

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
    }, [])
    return (
        <div className='NewsDetail'>
            <div className='col-1-news'>
                <h1 className='title-news'>{newspaper?.title}</h1>
                <p className='post-date'>Ngày đăng: {formatDate(newspaper?.postDate)}</p>
                <p className='content-news'>{newspaper?.content}</p>
                <img src='https://cafefcdn.com/2019/10/1/photo-1-15698951675771107256207.jpg' />
                <p className='content-news' style={{ marginTop: 15 }}>{newspaper?.content2}</p>
                <p className='author'>Tác giả: {author && author}</p>

                <h2 className='title-lien-quan'>BÀI BÁO LIÊN QUAN</h2>
                {newsLienQuans?.map((item, index) => {
                    return (
                        <div key={index} className='wrap-news'>
                            <img className='thumbnail' src='https://cafefcdn.com/2019/10/1/photo-1-15698951675771107256207.jpg' />
                            <p>{item?.title}</p>
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
                                <img className='thumbnail' src='https://cafefcdn.com/2019/10/1/photo-1-15698951675771107256207.jpg' />
                                <p>{item?.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewsDetail