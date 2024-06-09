import React, { useEffect, useState } from "react";
import './AllStrain.scss'
import { getAllStrainApi, getAllStrainByTheEmployee } from "../../../apis/apiStrain";
import ItemStrain from "../itemStrain/ItemStrain";

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
            <p>allsstrain</p>
            <div className="row-2">
                <p className="text-header">Danh sách các chủng</p>
                <div className="wrap-all-item">
                    {
                        strains?.map((item, index) => {
                            return (
                                <ItemStrain key={index} item={item}

                                />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default AllStrain