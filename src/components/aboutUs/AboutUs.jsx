import React from "react";
import './AboutUs.scss'
import { images } from "../../constants";

function AboutUs() {
    return (
        <div className="AboutUs">
            <div className="row-banner">
                <img className="banner" src={images.bannerintro} />
            </div>
            <div className="row-content">
                <div className="col-1">
                    <div className="content-1">
                        <h2 className="title">Về chúng tôi</h2>
                        <p>DAQStrain là đơn vị hoạt động trong lĩnh vực Công nghệ Thông tin, chuyên cung ứng các giải pháp Quản trị Vận hành và nghiên cứu strain cho mọi loại hình doanh nghiệp từ tiêu chuẩn đến chuyên sâu. Hơn một thập kỷ qua, DAQStrain liên tục cập nhật kiến thức công nghệ toàn cầu và kinh nghiệm tư vấn, triển khai hệ thống cho các tổ chức trong và ngoài nước. Ngoài ra, DQS còn phát triển các ứng dụng trong nghiên cứu strain và cung cấp strain, giúp các doanh nghiệp và tổ chức nghiên cứu tối ưu hóa quy trình và nâng cao hiệu quả hoạt động.</p>
                    </div>
                    <div className="content-1">
                        <h2 className="title">Tầm nhìn</h2>
                        <p>DAQStrain Solutions hướng đến trở thành một đơn vị hàng đầu trong lĩnh vực Công nghệ Thông tin và nghiên cứu strain, cung cấp các giải pháp quản trị vận hành và nghiên cứu chuyên sâu, tiên tiến nhất cho doanh nghiệp trên toàn cầu.</p>
                    </div>
                    <div className="content-1">
                        <h2 className="title">Sứ mệnh</h2>
                        <p>Đẩy mạnh nghiên cứu và cung cấp strain chất lượng cao, hỗ trợ các dự án nghiên cứu khoa học và phát triển sản phẩm trong nhiều lĩnh vực khác nhau.</p>
                    </div>
                </div>
                <div className="col-2">
                    <img src={images.illustration6} />
                </div>
            </div>

            <div className="row-value">
                <h2 className="title-value">Giá trị cốt lõi</h2>
                <div className="wrap-all-value">

                    <div className="wrap-value">
                        <img src={images.illustration2} />
                        <p>XỬ LÝ CHUYÊN NGHIỆP</p>
                    </div>

                    <div className="wrap-value">
                        <img src={images.illustration3} />
                        <p>CỐNG HIẾN HẾT MÌNH</p>
                    </div>

                    <div className="wrap-value">
                        <img src={images.illustration4} />
                        <p>SÁNG TẠO ĐỔI MỚI</p>
                    </div>

                    <div className="wrap-value">
                        <img src={images.illustration5} />
                        <p>TINH THẦN TRÁCH NHIỆM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs