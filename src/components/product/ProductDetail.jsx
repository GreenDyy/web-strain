import React, { useEffect, useState } from "react";
import './ProductDetail.scss'
import { getConditionByIdApi, getSpeciesByIdApi, getStrainByIdApi } from "../../apis/apiStrain";
import { useParams } from "react-router-dom";
import { images } from "../../constants";



function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [species, setSpecies] = useState(null);
    const [condition, setCondition] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiProduct = await getStrainByIdApi(id);
                const apiSpecies = await getSpeciesByIdApi(apiProduct.data.idSpecies)
                const apiCondition = await getConditionByIdApi(apiProduct.data.idCondition)
                setProduct(apiProduct.data)
                setSpecies(apiSpecies.data)
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
                <div className="wrap-row-1">
                    <div className="wrap-image">
                        <img className="image-item" src="https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg" alt="image-item" />

                    </div>

                    <div className="wrap-content">
                        <h2 className="title">Meat Vegegate</h2>
                        <div className="wrap-price">
                            <p className="price1">$100</p>
                            <p className="price2">$150</p>
                        </div>
                        <p>hiển thị star</p>
                        <p className="des">Mô tả</p>
                        <div className="wrap-all-btn">
                            <div className="wrap-btn-amount">
                                <button className="btn-increase">-</button>
                                <input className="input-number" type="text" />
                                <button className="btn-decrease">+</button>
                            </div>

                            <button className="btn-add-cart">
                                <p>Thêm vào giỏ hàng</p>
                            </button>
                        </div>
                        <div className="wrap-des">
                            <div className="wrap-des-col-1">

                            </div>

                            <div className="wrap-des-col-2">

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
