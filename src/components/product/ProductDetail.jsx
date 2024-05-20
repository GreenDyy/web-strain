import React, { useEffect, useState } from "react";
import './ProductDetail.scss'
import { getClassByIdApi, getConditionByIdApi, getGenusByIdApi, getPhylumByIdApi, getSpeciesByIdApi, getStrainByIdApi } from "../../apis/apiStrain";
import { useParams } from "react-router-dom";
import { FaStar, FaRegHeart } from "react-icons/fa";

import { images } from "../../constants";
import { convertImageByte } from "../../utils/Utils";

const dataMota = 'Trong vi sinh vật học, "strain" thường được dịch là "dòng" hoặc "chủng", và nó đề cập đến một nhóm vi sinh vật có đặc điểm di truyền tương tự nhau. Các dòng vi sinh vật có thể khác nhau về các tính chất như khả năng gây bệnh, sức đề kháng kháng sinh, hoặc khả năng sản xuất các chất sinh học cụ thể.'
const dataReview = 'Trong ngữ cảnh của vi sinh vật học, "strain" không chỉ đơn thuần là một khái niệm mà còn là nền tảng cho sự hiểu biết và ứng dụng trong nhiều lĩnh vực khác nhau. Sự đa dạng của các strain mở ra cơ hội cho việc nghiên cứu sâu rộng và phát triển các giải pháp đa dạng cho các thách thức y tế và công nghiệp hiện đại'
const navbarTitle = [
    {
        id: 1,
        title: 'Mô tả',
    },
    {
        id: 2,
        title: 'Thông tin chi tiết',
    },
    {
        id: 1,
        title: 'Đánh giá',
    },
]

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [classes, setClasses] = useState(null);
    const [phylum, setPhylum] = useState(null);
    const [species, setSpecies] = useState(null);
    const [genus, setGenus] = useState(null);
    const [condition, setCondition] = useState()

    //cho navbar con
    const [selectedNav, setSelectedNav] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiProduct = await getStrainByIdApi(id);
                const apiSpecies = await getSpeciesByIdApi(apiProduct.data.idSpecies)
                const apiGenus = await getGenusByIdApi(apiSpecies.data.idGenus)
                const apiClass = await getClassByIdApi(apiGenus.data.idClass)
                const apiPhylum = await getPhylumByIdApi(apiClass.data.idPhylum)
                const apiCondition = await getConditionByIdApi(apiProduct.data.idCondition)
                setProduct(apiProduct.data)
                setSpecies(apiSpecies.data)
                setGenus(apiGenus.data)
                setClasses(apiClass.data)
                setPhylum(apiPhylum.data)
                setCondition(apiCondition.data)
            } catch (error) {
                console.error("Lỗi fetchdata trong productdetail:", error);
            }
        };
        fetchData();
    }, []);
    // const imageSrc = item.imageStrain ? `data:image/jpeg;base64,${item.imageStrain}` : images.strainnull
    return (
        <div className="ProductDetail">
            {product ? (
                <div className="main">
                    <div className="wrap-row-1">
                        <div className="wrap-image">
                            <img className="image-item" src="https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg" alt="image-item" />
                            {/* <img className="image-item" src={convertImageByte(product?.imageStrain)} /> */}
                            <div className="slide">

                            </div>
                        </div>

                        <div className="wrap-content">
                            <h2 className="title">{product?.scientificName} - {product?.strainNumber}</h2>
                            <div className="wrap-price">
                                <p className="price1">{"199.000 VNĐ -"}</p>
                                <p className="price2"> $250.000 VNĐ</p>
                            </div>
                            <div className="all-star">
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star" />
                                <FaStar className="star" />
                            </div>
                            <p className="des">
                                Blue Dream is known for its well-rounded effects that combine the best of both indica and sativa. Users often report an initial cerebral rush, characterized by euphoria and increased focus, thanks to its Haze genetics. This is followed by a relaxing body high that helps ease tension without causing heavy sedation. This balance makes Blue Dream suitable for daytime use and a favorite among those looking for relief without heavy drowsiness.
                            </p>
                            <div className="wrap-all-btn">
                                <div className="wrap-btn-amount">
                                    <button className="btn-increase">-</button>
                                    <input className="input-number" type="text" defaultValue={0} readOnly />
                                    <button className="btn-decrease">+</button>
                                </div>

                                <button className="btn-add-cart">
                                    <p>Thêm vào giỏ hàng</p>
                                </button>
                            </div>

                            <div className="wish-list">
                                <FaRegHeart className="heart" />
                                <p className="text">Thêm vào danh sách ước</p>
                            </div>

                            <div className="wrap-des">
                                <div className="wrap-des-col-1">
                                    <p className="head">Former name: <span className="body">{product?.formerName}</span></p>
                                    <p className="head">Common name: <span className="body">{product?.commonName}</span></p>
                                    <p className="head">Cell size: <span className="body">{product?.cellSize}</span></p>
                                </div>

                                <div className="wrap-des-col-2">
                                    <p className="head">Collection site: <span className="body">{product?.collectionSite}</span></p>
                                    <p className="head">Continent: <span className="body">{product?.continent}</span></p>
                                    <p className="head">Country: <span className="body">{product?.country}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wrap-row-2">
                        <div className="navbar">
                            {/* <button className="btn-nav" onClick={() => { setContentNav(dataNavbarChild[0]) }}>Mô tả</button>
                            <button className="btn-nav" onClick={() => { setContentNav(dataNavbarChild[1]) }}>Thông tin chi tiết</button>
                            <button className="btn-nav" onClick={() => { setContentNav(dataNavbarChild[2]) }}>Review</button> */}
                            {navbarTitle.map((item, index) => {
                                return (
                                    <button className="btn-nav" onClick={() => { setSelectedNav(item.id) }}>{item.title}</button>
                                )
                            })}
                        </div>

                        <div className="nav-content">
                            {
                                selectedNav === 1 && (
                                    dataMota
                                )

                            }
                            {
                                selectedNav === 2 && (
                                    <div className="table-detail">
                                        <div className="table-title">
                                            <p>Thông tin chi tiết</p>
                                        </div>

                                        <div className="table-content">
                                            <div className="table-col-1">
                                                <div className="cell">
                                                    <p>Điều kiện sống</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Strain number</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Species</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Class</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Genus</p>
                                                </div>
                                                <div className="cell">
                                                    <p>Phylum</p>
                                                </div>

                                                <div className="cell">
                                                    <p>scientificName</p>
                                                </div>
                                                <div className="cell">
                                                    <p>synonymStrain</p>
                                                </div>
                                                <div className="cell">
                                                    <p>formerName</p>
                                                </div>
                                                <div className="cell">
                                                    <p>commonName</p>
                                                </div>
                                                <div className="cell">
                                                    <p>cellSize</p>
                                                </div>
                                                <div className="cell">
                                                    <p>organization</p>
                                                </div>

                                                <div className="cell">
                                                    <p>characteristics</p>
                                                </div>
                                                <div className="cell">
                                                    <p>collectionSite</p>
                                                </div>
                                                <div className="cell">
                                                    <p>continent</p>
                                                </div>
                                                <div className="cell">
                                                    <p>country</p>
                                                </div>

                                                <div className="cell">
                                                    <p>isolationSource</p>
                                                </div>
                                                <div className="cell">
                                                    <p>toxinProducer</p>
                                                </div>
                                                <div className="cell">
                                                    <p>stateOfStrain</p>
                                                </div>
                                                <div className="cell">
                                                    <p>agitationResistance</p>
                                                </div>
                                                <div className="cell">
                                                    <p>remarks</p>
                                                </div>
                                            </div>

                                            <div className="table-col-2">
                                            <div className="cell">
                                                    <p>{condition?.medium} {condition?.temperature} {condition?.lightIntensity} {condition?.duration}   </p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.strainNumber}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{species?.nameSpecies}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{classes?.nameClass}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{genus?.nameGenus}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{phylum?.namePhylum}</p>
                                                </div>

                                                <div className="cell">
                                                    <p>{product?.scientificName}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.synonymStrain}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.formerName}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.commonName}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.cellSize}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.organization}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.characteristics}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.collectionSite}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.continent}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.country}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.isolationSource}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.toxinProducer}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.stateOfStrain}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.agitationResistance}</p>
                                                </div>
                                                <div className="cell">
                                                    <p>{product?.remarks}</p>
                                                </div>
                                                

                                            </div>
                                        </div>
                                    </div>
                                )

                            }
                            {
                                selectedNav === 3 && (
                                    dataReview
                                )

                            }
                        </div>
                    </div>

                    <div className="wrap-row-3">
                        <h2 className="title">Có thể bạn sẽ thích</h2>
                        <div className="wrap-other-strain">
                            <div className="item-strain">
                                <img className="img-strain" src="https://img.freepik.com/free-photo/ingredients-grilled-wood-flame-plate-generative-ai_188544-8881.jpg" />
                                <p className="name-strain">Buffterfly Idle</p>
                            </div>

                            <div className="item-strain">
                                <img className="img-strain" src="https://img.freepik.com/free-photo/ingredients-grilled-wood-flame-plate-generative-ai_188544-8881.jpg" />
                                <p className="name-strain">Messastrum gracile </p>
                            </div>

                            <div className="item-strain">
                                <img className="img-strain" src="https://img.freepik.com/free-photo/ingredients-grilled-wood-flame-plate-generative-ai_188544-8881.jpg" />
                                <p className="name-strain">Sword Digitals</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Đang load</p>
            )}
        </div>
    );
}

export default ProductDetail;
