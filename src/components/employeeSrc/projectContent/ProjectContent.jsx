import React, { useEffect, useState } from "react";
import './ProjectContent.scss'
import { MdOutlineWorkHistory, MdOutlineWorkspacePremium, MdOutlineWorkOff } from "react-icons/md";
import { FaFirefoxBrowser } from "react-icons/fa";


function ProjectContent() {
    const [listIdProjectContent, setListIdProjectContent] = useState([])

    useEffect(() => {
        const fetchData = async () => {
       

        }
        fetchData()
    },[])
    console.log(listIdProjectContent)
    return (
        <div className="ProjectContent">
            <div className="row-statistical">
                <p className="text-header">Thống kê công việc</p>
                <div className="wrap-all-statistical">

                    <div className="o-1">
                        <p className="title">Công việc chưa làm</p>
                        <div className="wrap-quantity">
                            <p className="quantity">0</p>
                            <MdOutlineWorkOff className="icon-work" />
                        </div>
                    </div>

                    <div className="o-2">
                        <p className="title">Công việc đã hoàn thành</p>
                        <div className="wrap-quantity">
                            <p className="quantity">7</p>
                            <MdOutlineWorkspacePremium className="icon-work" />
                        </div>
                    </div>

                    <div className="o-3">
                        <p className="title">Công việc còn trong hạn</p>
                        <div className="wrap-quantity">
                            <p className="quantity">5</p>
                            <MdOutlineWorkHistory className="icon-work" />
                        </div>
                    </div>

                    <div className="o-4">
                        <p className="title">Công việc sắp tới hạn</p>
                        <div className="wrap-quantity">
                            <p className="quantity">10</p>
                            <FaFirefoxBrowser className="icon-work" />
                        </div>
                    </div>

                </div>

            </div>

            <div className="row-work">
                <div className="row-filter">
                    <p className="text-header">Công việc của tôi - Tên dự án</p>
                    {/* //loc trong cai 1 trong 4 the minh ấn thoi, 4 the khac nhau */}
                    <button className="btn-filter">Độ ưu tiên: Tất cả</button>
                    <button className="btn-filter">Tiến độ: Tới hạn</button>
                </div>

                <div className="row-table">

                </div>
            </div>
        </div>
    )
}

export default ProjectContent