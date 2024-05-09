import React from "react";
import './Footer.css'
import { Link } from "react-router-dom";
import { icons } from '../../constants'

function Footer() {
    return (
        <div className="Footer">
            {/* dòng 1 */}
            <div style={{ display: "flex", flexWrap: 'wrap' }}>
                {/* cột 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 40, marginLeft: 10, marginRight: 10 }}>
                    <h2>Về chúng tôi</h2>
                    <p>This powerful and all-around free Bootstrap footer works for all types of websites, online stores, and blogs.

                        However, it will work best for everyone looking to add Twitter and Instagram feeds into their footer area.

                        That is something this free snippet sorts out, but you still need to work on the back-end to make it functional—additional widgets for About Us, contact number, email, and newsletter subscription.

                        At the bottom is also a footer menu for site navigation.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="icon" src={icons.phone} />
                        <strong style={{ fontSize: 18 }}>+8472838549294</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="icon" src={icons.mail} />
                        <strong style={{ fontSize: 18 }}>daqstrain@company.com.vn</strong>
                    </div>
                    {/* searchbox */}
                    <div style={{display:'flex'}}>
                        <div className="search-box">
                            <input type="text" placeholder="Nhập email của bạn" />
                            <button>Gửi</button>
                        </div>
                    </div>

                </div>
                {/* cột 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 30, marginLeft: 10, marginRight: 10 }}>
                    <h2>Các dự án nghiên cứu gần đây</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img className="icon" src={icons.social} />
                        <p>Dự án nghiên cứu Katoratka của tập đoàn Cimocka</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img className="icon" src={icons.social} />
                        <p>Dự án nghiên cứu Katoratka của tập đoàn Cimocka</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img className="icon" src={icons.social} />
                        <p>Dự án nghiên cứu Katoratka của tập đoàn Cimocka</p>
                    </div>
                </div>
                {/* cột 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 30, marginLeft: 10, marginRight: 10 }}>
                    <h2>Mạng xã hội</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <img style={{ height: 200, width: '45%', margin: 5, borderRadius: 20, objectFit: 'cover' }} src="https://www.pace.edu.vn/uploads/news/2023/11/social-media.jpg" alt="Image 1" />
                        <img style={{ height: 200, width: '45%', margin: 5, borderRadius: 20, objectFit: 'cover' }} src="https://mpost.io/wp-content/uploads/image-74-7-1024x1024.jpg" alt="Image 1" />
                        <img style={{ height: 200, width: '45%', margin: 5, borderRadius: 20, objectFit: 'cover' }} src="https://thanhnien.mediacdn.vn/uploaded/duyphuc/2020_02_12/corana_LOJR.jpg?width=689" alt="Image 1" />
                        <img style={{ height: 200, width: '45%', margin: 5, borderRadius: 20, objectFit: 'cover' }} src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/7/16/820047/Virus-Corona.jpg" alt="Image 1" />
                    </div>
                </div>
            </div>
            {/* dòng 2 */}
            <hr style={{ border: '1px solid black', width: '100%' }} />
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <ul style={{ display: 'flex', justifyContent: 'start' }}>
                    <li>
                        <Link className='Link' to='/' >Trang chủ</Link>
                    </li>
                    <li>
                        <Link to='/Intro' className='Link'>Sản phẩm</Link>
                    </li>
                    <li>
                        <Link to='/Intro' className='Link'>Đăng nhập</Link>
                    </li>
                    <li>
                        <Link to='/Intro' className='Link'>Nghiên cứu</Link>
                    </li>
                    <li>
                        <Link to='/Intro' className='Link'>Truyền thông</Link>
                    </li>
                    <li>
                        <Link to='/Intro' className='Link'>Về chúng tôi</Link>
                    </li>
                </ul>
                <img src={icons.logodark} />
            </div>
        </div>
    )
}

export default Footer