import React, { useState, useEffect } from 'react'
import './Product.scss'
import ReactPaginate from 'react-paginate';
import { getAllPhylumApi, getAllStrainFollowClassApi } from '../../../apis/apiStrain'
import { useNavigate, useParams } from 'react-router-dom';
import { BsSearchHeart } from "react-icons/bs";
import TreeView from '../treeview/TreeView';
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import ItemProduct from '../ItemProduct/ItemProduct';
import Loading from '../../loading/Loading';
import { toastError } from '../../Toast/Toast';
import { images } from '../../../constants';


//MAIN-------
function ProductClass() {
    const { nameClass, pageRouter } = useParams();
    const [dataStrain, setDataStrain] = useState([])
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('Scientific_Name_Asc')
    const [totalPage, setTotalPage] = useState(0)
    const [treeData, setTreeData] = useState([]);
    const navigate = useNavigate()

    //get data strain
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataTree = await getAllPhylumApi()
                const dataStrain = await getAllStrainFollowClassApi(nameClass, search, sortBy, pageRouter)
                setTreeData(dataTree.data);
                setDataStrain(dataStrain.data);
                setTotalPage(dataStrain.data[0]?.totalPage)
            }
            catch (error) {
                console.log('Lỗi fetching data: ', error)
                toastError("Không thể kết nối Server, vui lòng kiểm tra kết nối internet", 'top-center')
            }
        }
        fetchData()
    }, [search, sortBy, pageRouter, nameClass])

    const handleGoToDetail = (idStrain) => {
        navigate(`/ProductDetail/${idStrain}`);
    }

    const handleSelectNode = async (node) => {
        if (node.idPhylum) {
            if (node.idClass) {
                navigate(`/Product/Class/${node.nameClass}/1`);
            }
            else {
                navigate(`/Product/Phylum/${node.namePhylum}/1`);
            }
        }
        else {
            if (node.idGenus) {
                if (node.idSpecies) {
                    navigate(`/Product/Species/${node.nameSpecies}/1`);
                }
                else {
                    navigate(`/Product/Genus/${node.nameGenus}/1`);
                }
            }
        }
    };
    return (
        <div className='Product'>
            <div className='row-category-item'>
                {/* cột lọc */}
                <div className='col-category'>
                    <div className='search-box'>
                        <input className='input-search'
                            type='text'
                            placeholder='Search...'
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                        <BsSearchHeart className='icon-search' />
                    </div>

                    <TreeView data={treeData} onSelectNode={handleSelectNode} />

                </div>
                {/* cột ds strain */}
                {dataStrain.length !== 0 &&
                    <div className='col-all-item'>
                        <div className='wrap-row-header'>
                            <h1 className='header'>Danh sách Strain</h1>
                        </div>

                        <div className='sort-by'>
                            <p>Sắp xếp theo tên: </p>
                            {sortBy === 'Scientific_Name_Asc'
                                ? <FaSortAlphaUp className='icon-sort' onClick={() => { setSortBy('Scientific_Name_Desc') }} />
                                : <FaSortAlphaDown className='icon-sort' onClick={() => { setSortBy('Scientific_Name_Asc') }} />}
                        </div>

                        <div className='wrap-item'>
                            {dataStrain?.map((item, index) => (
                                <ItemProduct
                                    key={index}
                                    item={item}
                                    onClickToDetail={handleGoToDetail}
                                />
                            ))}
                        </div>

                        {/* số trang */}

                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={(event) => {
                                const selectedPage = event.selected;
                                navigate(`/Product/Class/${nameClass}/${selectedPage + 1}`);
                            }}
                            pageRangeDisplayed={5}
                            pageCount={totalPage}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            pageLinkClassName="btn-page"
                            activeLinkClassName="btn-page-active"
                            previousLinkClassName="btn-previous"
                            nextLinkClassName="btn-next"
                        />
                    </div>
                }

                {dataStrain.length === 0 && search !== '' &&
                    <div className='notification'>
                        <img className='img-empty' src={images.emptysearch} />
                        <h2 >Không tìm thấy mẫu này</h2>
                    </div>
                }

                {dataStrain.length === 0 && search === '' &&
                    <div className="loading">
                        <Loading />
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductClass