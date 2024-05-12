import React, { useEffect, useState } from "react";
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
        <div>
            {product ? (
                <>
                    <h1>id: {product?.idStrain}</h1>
                    <h1>Strain number: {product?.strainNumber}</h1>
                    <p>{product?.idSpecies}</p>
                    <h2>Conditional Strain</h2>
                    <div style={{display:'flex'}}>  
                        <p>Medium: {condition?.medium}</p>
                        <p>Temperature: {condition?.temperature}</p>
                        <p>Light Intensity: {condition?.lightIntensity}</p>
                        <p>Duration: {condition?.duration}</p>
                    </div>
                    
                    <p>scientificName: {product?.scientificName}</p>
                    <p>synonymStrain: {product?.synonymStrain}</p>
                    <p>formerName: {product?.formerName}</p>
                    <p>commonName: {product?.commonName}</p>
                    <p>cellSize: {product?.cellSize}</p>
                    <p>organization: {product?.organization}</p>
                    <p>characteristics: {product?.characteristics}</p>
                    <p>collectionSite: {product?.collectionSite}</p>
                    <p>continent: {product?.continent}</p>
                    <p>country: {product?.country}</p>
                    <p>isolationSource: {product?.isolationSource}</p>
                    <p>toxinProducer: {product?.toxinProducer}</p>
                    <p>stateOfStrain: {product?.stateOfStrain}</p>
                    <p>agitationResistance: {product?.agitationResistance}</p>
                    <p>remarks: {product?.remarks}</p>
                    <p>geneInformation: {product?.geneInformation}</p>
                </>
            ) : (
                <p>Đang load</p>
            )}
        </div>
    );
}

export default ProductDetail;
