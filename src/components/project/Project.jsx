import React from 'react'
import './Project.scss'

const Project = () => {
    return (
        <div className='Project'>
            {/* item */}
            <div className='project-item'>
                {/* trắng */}
                <div className='card-text'>
                    <p className='date'>Ngày 29 tháng 3 năm 2023</p>
                    <h2 className='title'>Dự án AVATAR DEPLOY CODE</h2>
                    <p className='des'>Dự án Avatra Deploy Code nhận nhiều ý kiến trái chiều</p>
                    <button className='btn-read'>ĐỌC THÊM</button>
                </div>
                {/* hình */}
                <div className='card-image'>
                    <img src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gnar_31.jpg' className='card-img' />
                </div>
            </div>
        </div>
    )
}

export default Project
