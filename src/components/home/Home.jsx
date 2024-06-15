import React from "react";
import './Home.scss'
import { useNavigate } from "react-router-dom";
import { removeDataLocalStorage } from "../../utils/Utils";
import { images } from "../../constants";

function Home() {
    const navigate = useNavigate()
    return (
        <div className="Home">
            <img className="banner" src={images.bannerstrain} />
            <div className="wrap-content">
                <div className="col-1">
                    <h1>STRAIN IS YOUR LIFE.</h1>
                    <h1 style={{ marginTop: -10 }}>Với hơn 3000 chủng tảo và động vật nguyên sinh.</h1>
                    <p>
                        <strong>DAQStrain </strong>
                        là một công ty tiên phong trong lĩnh vực nghiên cứu các chủng vi sinh, chuyên cung cấp các giải pháp quản trị vận hành và nghiên cứu chuyên sâu cho doanh nghiệp trên toàn cầu. Với sứ mệnh trở thành đơn vị hàng đầu trong ngành, DAQStrain không ngừng phát triển và ứng dụng những công nghệ tiên tiến nhất để đáp ứng nhu cầu của khách hàng.
                    </p>

                    <button onClick={() => {
                        removeDataLocalStorage('node')
                        navigate('/Product/1')
                    }}>
                        Xem các strain của chúng tôi
                    </button>
                </div>
                <div className="col-2">
                    <img className="img-circle" src="https://w.forfun.com/fetch/5a/5aa54d794911a4d82c0e13ebda44ef52.jpeg" />
                </div>
            </div>

        </div>
    )
}

export default Home