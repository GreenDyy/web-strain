import React from "react";
import './Home.css'
import { Link } from "react-router-dom";
import { images } from '../../constants/constants'

function Home() {
    return (
        <div className="Home">
            <div style={{ display: 'flex', flex: 50, flexDirection: 'column' }}>
                <h1>STRAIN IS YOUR LIFE.</h1>
                <h1 style={{ marginTop: -10 }}>Với hơn 3000 chủng tảo và động vật nguyên sinh.</h1>
                <p>
                    <strong>DAQStrain</strong> là bộ sưu tập dịch vụ lớn nhất và đa dạng nhất của Châu Âu dành cho các chủng sinh vật sống từ môi trường biển, nước ngọt và trên cạn cũng như bộ sưu tập tảo cát vùng cực ngày càng tăng
                </p>
                <Link to='/Product'>
                    <button>Xem các strain của chúng tôi</button>
                </Link>
            </div>
            <div style={{ display: 'flex', flex: 50, flexDirection: 'column', alignItems: 'center' }}>
                <img src={images.doctor} />
            </div>
        </div>
    )
}

export default Home