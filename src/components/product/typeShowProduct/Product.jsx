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
} from '../../../apis/apiStrain';
import { useNavigate, useParams } from 'react-router-dom';
import { toastError } from '../../Toast/Toast';
import { BsSearchHeart } from "react-icons/bs";
import TreeView from '../treeview/TreeView';
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import ItemProduct from '../ItemProduct/ItemProduct';
import Loading from '../../loading/Loading';
import { images } from '../../../constants';

function Product() {
    const { pageRouter } = useParams();
    const [dataStrain, setDataStrain] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [treeData, setTreeData] = useState([]);
    const [node, setNode] = useState({
        idClass: null,
        nameClass: null,
        idGenus: null,
        nameGenus: null,
        idPhylum: null,
        namePhylum: null,
        idSpecies: null,
        nameSpecies: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('bạn đã click vào node', node);

                const dataTree = await getAllPhylumApi();
                let dataStrain = '';

                if (!node.idClass && !node.idGenus && !node.idPhylum && !node.idSpecies) {
                    dataStrain = await getAllStrainApi(search, sortBy, pageRouter);
                    navigate(`/Product/All/${pageRouter}`, { replace: true });
                } else if (node.idClass) {
                    dataStrain = await getAllStrainFollowClassApi(node.nameClass, search, sortBy, pageRouter);
                    navigate(`/Product/Class/${pageRouter}`, { replace: true });
                } else if (node.idPhylum) {
                    dataStrain = await getAllStrainFollowPhylumApi(node.namePhylum, search, sortBy, pageRouter);
                    navigate(`/Product/Phylum/${pageRouter}`, { replace: true });
                } else if (node.idSpecies) {
                    dataStrain = await getAllStrainFollowSpeciesApi(node.nameSpecies, search, sortBy, pageRouter);
                    navigate(`/Product/Species/${pageRouter}`, { replace: true });
                } else if (node.idGenus) {
                    dataStrain = await getAllStrainFollowGenusApi(node.nameGenus, search, sortBy, pageRouter);
                    navigate(`/Product/Genus/${pageRouter}`, { replace: true });
                }

                setTreeData(dataTree.data);
                setDataStrain(dataStrain.data);
                setTotalPage(dataStrain.data[0]?.totalPage || 0);
            } catch (error) {
                console.log('Lỗi fetching data: ', error);
                toastError("Không thể kết nối Server, vui lòng kiểm tra kết nối internet", 'top-center');
            }
        };
        fetchData();
    }, [search, sortBy, pageRouter, node, navigate])

    const handleGoToDetail = (idStrain) => {
        navigate(`/ProductDetail/${idStrain}`);
    };

    const handleSelectNode = (selectedNode) => {
        setNode(prevNode => ({
            idClass: selectedNode.idClass || prevNode.idClass,
            nameClass: selectedNode.nameClass || prevNode.nameClass,
            idGenus: selectedNode.idGenus || prevNode.idGenus,
            nameGenus: selectedNode.nameGenus || prevNode.nameGenus,
            idPhylum: selectedNode.idPhylum || prevNode.idPhylum,
            namePhylum: selectedNode.namePhylum || prevNode.namePhylum,
            idSpecies: selectedNode.idSpecies || prevNode.idSpecies,
            nameSpecies: selectedNode.nameSpecies || prevNode.nameSpecies
        }));
    };

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

                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={(event) => {
                                const selectedPage = event.selected;
                                let categoryRoute = '';

                                if (node.idClass) {
                                    categoryRoute = 'Class';
                                } else if (node.idPhylum) {
                                    categoryRoute = 'Phylum';
                                } else if (node.idSpecies) {
                                    categoryRoute = 'Species';
                                } else if (node.idGenus) {
                                    categoryRoute = 'Genus';
                                } else {
                                    categoryRoute = '';
                                }

                                navigate(`/Product/${categoryRoute}/${selectedPage + 1}`);
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
