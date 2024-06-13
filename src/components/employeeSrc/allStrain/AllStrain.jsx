import React, { useEffect, useState } from "react";
import './AllStrain.scss';
import { getAllStrainApi, getAllStrainByTheEmployee, getAllStrainForEmployeeApi, getStrainByIdApi } from "../../../apis/apiStrain";
import ItemStrain from "../itemStrain/ItemStrain";
import { BsSearchHeart } from "react-icons/bs";
import StrainModal from "../strainUpload/StrainModal";
import { images } from "../../../constants";

function AllStrain() {
    const [strains, setStrains] = useState([]);
    const [search, setSearch] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false)
    const [strain, setStrain] = useState(null)

    const fetchStrains = async (reset = false) => {
        const response = await getAllStrainForEmployeeApi(search, page);
        if (reset) {
            setStrains(response.data);
        } else {
            setStrains(prevStrains => [...prevStrains, ...response.data]);
        }
        setTotalPage(response.data[0]?.totalPage);
    };

    useEffect(() => {
        fetchStrains(true);
    }, [search]);

    useEffect(() => {
        if (page > 1) {
            fetchStrains();
        }
    }, [page]);


    const handleShowmore = () => {
        if (page < totalPage) {
            setPage(page + 1);
        }
    };

    const onHandleDetail = async (idStrain) => {
        const strain = await getStrainByIdApi(idStrain);
        setStrain(strain.data)
        setShowModal(true)
        window.scrollTo({ top: 0 })
    }

    return (
        <div className="AllStrain">
            <div className="row-2-as">
                <p className="text-header-as">Danh sách các chủng</p>

                <div className='search-box-as'>
                    <input className='input-search'
                        type='text'
                        placeholder='Nhập tên hoặc mã chủng...'
                        value={search}
                        onChange={(e) => {
                            setPage(1);  // Reset page to 1 when search changes
                            setSearch(e.target.value);
                        }}
                    />
                    <BsSearchHeart className='icon-search' />
                </div>

                {page !== totalPage && <button className="btn-showmore" onClick={handleShowmore}>Xem thêm</button>}
                {strains.length !== 0 ?
                    <div className="wrap-all-item-as">
                        {
                            strains?.map((item, index) => {
                                return (
                                    <ItemStrain key={index} item={item} onHandleDetail={onHandleDetail} />
                                )
                            })
                        }
                    </div>
                    :
                    <div className='notification'>
                        <img className='img-empty' src={images.emptysearch} />
                        <h2>Không tìm thấy chủng này</h2>
                    </div>
                }


                {showModal && (
                    <StrainModal handleCloseModal={() => setShowModal(false)} strain={strain} isGlobal={true} />
                )}
            </div>
        </div>
    );
}

export default AllStrain;
