import React from "react";
import './Footer.css'
import { useNavigate } from "react-router-dom";
import { icons, images } from '../../constants'

function Footer() {
    const navigate = useNavigate()
    return (
        <div className="Footer">
            {/* dòng 1 */}
            <div style={{ display: "flex", flexWrap: 'wrap' }}>
                {/* cột 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 40, marginLeft: 10, marginRight: 10 }}>
                    <h2>Về chúng tôi</h2>
                    <p className="about-us">DAQStrain là bộ sưu tập dịch vụ lớn nhất và đa dạng nhất của Châu Âu dành cho các chủng sinh vật sống từ môi trường biển, nước ngọt và trên cạn cũng như bộ sưu tập tảo cát vùng cực ngày càng tăng
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="icon" src={icons.phone} />
                        <strong style={{ fontSize: 18 }}>+8472838549294</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="icon" src={icons.mail} />
                        <strong style={{ fontSize: 18 }} onClick={ ()=>navigate('/Employee')}>daqstrain@gmail.com</strong>
                    </div>
                    {/* searchbox */}
                    <div style={{ display: 'flex' }}>
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
                        <p >Nghiên cứu đa dạng di truyền, thiết lập bộ sưu tập và chọn lọc các chủng Vi tảo có tiềm năng dinh dưỡng từ khu dự trữ sinh quyển rừng ngập mặn Cần Giờ</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img className="icon" src={icons.social} />
                        <p>Dự án nghiên cứu Katoratka của tập đoàn Cimocka</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img className="icon" src={icons.social} />
                        <p>Dự án nghiên cứu sinh học và phát triển MAUI</p>
                    </div>
                </div>
                {/* cột 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 30, marginLeft: 10, marginRight: 10 }}>
                    <h2>Mạng xã hội</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <img style={{ height: 200, width: '45%', margin: 5, borderRadius: 20, objectFit: 'cover' }} src={images.illustration7} alt="Image 1" />
                        <img style={{ height: 200, width: '45%', margin: 5, borderRadius: 20, objectFit: 'cover' }} src={images.illustration6} alt="Image 1" />
                        <img style={{ height: 200, width: '45%', margin: 5, borderRadius: 20, objectFit: 'cover' }} src={images.illustration3} alt="Image 1" />
                        <img style={{ height: 200, width: '45%', margin: 5, borderRadius: 20, objectFit: 'cover' }} src={images.illustration2} alt="Image 1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer