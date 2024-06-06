import React, { useState, useEffect } from 'react';
import './Product.scss';
import ReactPaginate from 'react-paginate';
import {
    getAllPhylumApi,
    getAllStrainApi,
    getAllStrainFollowClassApi,
    getAllStrainFollowGenusApi,
    getAllStrainFollowPhylumApi,
    getAllStrainFollowSpeciesApi
} from '../../apis/apiStrain';
import { useNavigate, useParams } from 'react-router-dom';
import { toastError } from '../Toast/Toast';
import { BsSearchHeart } from "react-icons/bs";
import TreeView from './treeview/TreeView';
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import ItemProduct from './ItemProduct/ItemProduct';
import Loading from '../loading/Loading';
import { images } from '../../constants';
import { getDataLocalStorage, setDataLocalStorage } from '../../utils/Utils';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function Product() {
    const { pageRouter } = useParams();
    const [dataStrain, setDataStrain] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [treeData, setTreeData] = useState([]);
    const [node, setNode] = useState({
        idClass: getDataLocalStorage('node')?.idClass || null,
        nameClass: getDataLocalStorage('node')?.nameClass || null,
        idGenus: getDataLocalStorage('node')?.idGenus || null,
        nameGenus: getDataLocalStorage('node')?.nameGenus || null,
        idPhylum: getDataLocalStorage('node')?.idPhylum || null,
        namePhylum: getDataLocalStorage('node')?.namePhylum || null,
        idSpecies: getDataLocalStorage('node')?.idSpecies || null,
        nameSpecies: getDataLocalStorage('node')?.nameSpecies || null,
    });
    const navigate = useNavigate();
    //lấy data cây 1 lần thôi
    useEffect(() => {
        const fetchData = async () => {
            const dataTree = await getAllPhylumApi();
            setTreeData(dataTree.data);
        }
        fetchData()
    }, [])
    //data strain nè
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('bạn đã click vào node', node);
                let dataStrain = '';
                if (!node.idClass && !node.idGenus && !node.idPhylum && !node.idSpecies) {
                    dataStrain = await getAllStrainApi(search, sortBy, pageRouter);
                    console.log('đang lấy all');
                    navigate(`/Product/${pageRouter}`);
                } else if (node.idClass) {
                    dataStrain = await getAllStrainFollowClassApi(node.nameClass, search, sortBy, pageRouter);
                    console.log('đang lấy class');
                    navigate(`/Product/Class/${node.nameClass}/${pageRouter}`); //render cái content
                } else if (node.idPhylum) {
                    dataStrain = await getAllStrainFollowPhylumApi(node.namePhylum, search, sortBy, pageRouter);
                    console.log('đang lấy phylum');
                    navigate(`/Product/Phylum/${node.namePhylum}/${pageRouter}`);
                } else if (node.idSpecies) {
                    dataStrain = await getAllStrainFollowSpeciesApi(node.nameSpecies, search, sortBy, pageRouter);
                    console.log('đang lấy species');
                    navigate(`/Product/Species/${node.nameSpecies}/${pageRouter}`);
                } else if (node.idGenus) {
                    dataStrain = await getAllStrainFollowGenusApi(node.nameGenus, search, sortBy, pageRouter);
                    console.log('đang lấy genus');
                    navigate(`/Product/Genus/${node.nameGenus}/${pageRouter}`);
                }


                setDataStrain(dataStrain.data);
                setTotalPage(dataStrain.data[0]?.totalPage || 0);
            } catch (error) {
                console.log('Lỗi fetching data: ', error);
                toastError("Không thể kết nối Server, vui lòng kiểm tra kết nối internet", 'top-center');
            }
        };
        fetchData();
    }, [search, sortBy, pageRouter, node])

    const handleGoToDetail = (idStrain) => {
        navigate(`/ProductDetail/${idStrain}`);
    };

    const handleSelectNode = async (node) => {
        if (node.idPhylum) {
            if (node.idClass) {
                setNode({
                    idClass: node.idClass,
                    nameClass: node.nameClass,
                    idGenus: null,
                    nameGenus: null,
                    idPhylum: null,
                    namePhylum: null,
                    idSpecies: null,
                    nameSpecies: null
                })
            }
            else {
                setNode({
                    idClass: null,
                    nameClass: null,
                    idGenus: null,
                    nameGenus: null,
                    idPhylum: node.idPhylum,
                    namePhylum: node.namePhylum,
                    idSpecies: null,
                    nameSpecies: null
                })
            }
        }
        else {
            if (node.idGenus) {
                if (node.idSpecies) {
                    setNode({
                        idClass: null,
                        nameClass: null,
                        idGenus: null,
                        nameGenus: null,
                        idPhylum: null,
                        namePhylum: null,
                        idSpecies: node.idSpecies,
                        nameSpecies: node.nameSpecies
                    })
                }
                else {
                    setNode({
                        idClass: null,
                        nameClass: null,
                        idGenus: node.idGenus,
                        nameGenus: node.nameGenus,
                        idPhylum: null,
                        namePhylum: null,
                        idSpecies: null,
                        nameSpecies: null
                    })
                }
            }
        }
        setDataLocalStorage('node', node)
    }

    return (
        <div className='Product'>
            <div className='row-category-item'>
                <div className='col-category'>
                    <div className='search-box'>
                        <input className='input-search'
                            type='text'
                            placeholder='Search...'
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <BsSearchHeart className='icon-search' />
                    </div>

                    <TreeView data={treeData} onSelectNode={handleSelectNode} />
                </div>

                {dataStrain.length !== 0 ? (
                    <div className='col-all-item'>
                        <div className='wrap-all-item'>
                            <div className='wrap-row-header'>
                                <h1 className='header'>Danh sách Strain</h1>
                            </div>

                            <div className='sort-by'>
                                <p>Sắp xếp theo tên: </p>
                                {sortBy === 'Scientific_Name_Asc'
                                    ? <FaSortAlphaUp className='icon-sort' onClick={() => setSortBy('Scientific_Name_Desc')} />
                                    : <FaSortAlphaDown className='icon-sort' onClick={() => setSortBy('Scientific_Name_Asc')} />}
                            </div>

                            <div className='wrap-item'>
                                {dataStrain.map((item, index) => (
                                    <ItemProduct
                                        key={index}
                                        item={item}
                                        onClickToDetail={handleGoToDetail}
                                    />
                                ))}
                            </div>
                        </div>


                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={<GoChevronRight />}
                            previousLabel={<GoChevronLeft />}
                            onPageChange={(event) => {
                                const selectedPage = event.selected;
                                if (node.idClass) {
                                    navigate(`/Product/Class/${node.nameClass}/${selectedPage + 1}`)
                                    window.scrollTo({ top: 0 })
                                } else if (node.idPhylum) {
                                    navigate(`/Product/Phylum/${node.namePhylum}/${selectedPage + 1}`)
                                    window.scrollTo({ top: 0 })
                                } else if (node.idSpecies) {
                                    navigate(`/Product/Species/${node.nameSpecies}/${selectedPage + 1}`)
                                    window.scrollTo({ top: 0 })
                                } else if (node.idGenus) {
                                    navigate(`/Product/Genus/${node.nameGenus}/${selectedPage + 1}`)
                                    window.scrollTo({ top: 0 })
                                } else {
                                    navigate(`/Product/${selectedPage + 1}`);
                                }
                            }}
                            pageRangeDisplayed={5}
                            pageCount={totalPage}

                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            pageLinkClassName="btn-page"
                            activeLinkClassName="btn-page-active"
                            previousLinkClassName="btn-previous"
                            nextLinkClassName="btn-next"
                        />
                    </div>
                ) : (
                    search !== '' ? (
                        <div className='notification'>
                            <img className='img-empty' src={images.emptysearch} />
                            <h2>Không tìm thấy mẫu này</h2>
                        </div>
                    ) : (
                        <div className="loading">
                            <Loading />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Product;
