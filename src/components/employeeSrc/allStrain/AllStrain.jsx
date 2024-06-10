import React, { useEffect, useState } from "react";
import './AllStrain.scss'
import { getAllStrainApi, getAllStrainByTheEmployee } from "../../../apis/apiStrain";
import ItemStrain from "../itemStrain/ItemStrain";
import { BsSearchHeart } from "react-icons/bs";

function AllStrain() {
    const [strains, setStrains] = useState([])
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [totalPage, setTotalPage] = useState(0);

    const fetchStrains = async () => {
        // const response = await getAllStrainByTheEmployee("NV007");
        const response = await getAllStrainApi(search, sortBy, 1);
        setStrains(response.data);
    }

    useEffect(() => {
        fetchStrains();
    }, []);
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
                            setSearch(e.target.value);
                        }}
                    />
                    <BsSearchHeart className='icon-search' />
                </div>
                <div className="wrap-all-item-as">
                    {
                        strains?.map((item, index) => {
                            return (
                                <ItemStrain key={index} item={item} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default AllStrain