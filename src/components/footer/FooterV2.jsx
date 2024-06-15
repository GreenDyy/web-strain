import React from "react";
import './FooterV2.scss'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGooglePlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function FooterV2() {
    const navigate = useNavigate()
    const handleToLink = (route) => {
        navigate(route)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleOpenNewTab = (link) => {
        window.open(link, 'blank')
    }
    return (
        <div className="FooterV2">
            <div className="row-1-footer">
                <h2 className="title-row-1">DAQStrain</h2>
                <p>DAQStrain hướng tới mục tiêu trở thành đơn vị hàng đầu trong lĩnh vực nghiên cứu các chủng vi sinh. Chúng tôi cung cấp các giải pháp quản trị vận hành và nghiên cứu chuyên sâu, tiên tiến nhất cho doanh nghiệp trên toàn cầu.</p>
                <div className="wrap-all-icon">
                    <FaFacebook className="icon" />
                    <FaInstagram className="icon" />
                    <FaTwitter className="icon" />
                    <FaYoutube className="icon" onClick={() => handleOpenNewTab('https://www.youtube.com/channel/UCvmIHpWJ5HFjA3qqOIXaM7A')} />
                    <FaGooglePlusSquare className="icon" />
                </div>
                <div className="wrap-all-feature">
                    <p className="feature" onClick={() => handleToLink('/AboutUs')}>Về chúng tôi</p>
                    <p className="feature" onClick={() => handleToLink('/Contact')}>Liên hệ</p>
                    <p className="feature" onClick={() => handleToLink('/Newspaper')}>Báo khoa học</p>
                    <p className="feature last" onClick={() => handleToLink('/Product/1')}>Sản phẩm</p>
                </div>
            </div>
            <div className="row-2-footer">
                <p onClick={() => navigate('/Employee')}>Copyright ©️2024 Bản quyền thuộc về DAQStrain | Cung cấp bởi GreenD</p>
            </div>
        </div>
    )
}

export default FooterV2