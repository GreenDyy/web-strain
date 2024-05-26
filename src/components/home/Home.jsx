import React from "react";
import './Home.scss'
import { Link } from "react-router-dom";
import { images } from '../../constants'

function Home() {
    return (
        <div className="Home">
            {/* <img className="banner" src="https://img.timviecthietke.com/2021/06/kich-thuoc-banner-website-1.png" /> */}
            <div className="wrap-content">
                <div className="col-1">
                    <h1>STRAIN IS YOUR LIFE.</h1>
                    <h1 style={{ marginTop: -10 }}>Với hơn 3000 chủng tảo và động vật nguyên sinh.</h1>
                    <p>
                        <strong>DAQStrain</strong> là bộ sưu tập dịch vụ lớn nhất và đa dạng nhất của Châu Âu dành cho các chủng sinh vật sống từ môi trường biển, nước ngọt và trên cạn cũng như bộ sưu tập tảo cát vùng cực ngày càng tăng
                    </p>
                    <Link to='/Product/1'>
                        <button>Xem các strain của chúng tôi</button>
                    </Link>
                </div>
                <div className="col-2">
                    <img className="img-circle" src="https://w.forfun.com/fetch/5a/5aa54d794911a4d82c0e13ebda44ef52.jpeg" />
                </div>
            </div>

        </div>
    )
}

export default Home