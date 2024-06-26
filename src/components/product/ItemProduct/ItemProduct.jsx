import React, { useEffect, useState } from "react";
import './ItemProduct.scss'
import { images } from "../../../constants";
import { convertImageByte, formatCurrency } from "../../../utils/Utils";
import { IoHeartCircleOutline } from "react-icons/io5";
import { getInventoryByIdStrainApi } from "../../../apis/apiInventory";

function ItemProduct({ item, onClickToDetail }) {
    const [statusStock, setStatusStock] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const inventory = await getInventoryByIdStrainApi(item.idStrain)
            if (inventory.data.quantity > 0) {
                setStatusStock(true)
            }
            else {
                setStatusStock(false)
            }
        }
        fetchData()
    }, [item])
    const imageSrc = item.imageStrain ? convertImageByte(item.imageStrain) : images.strainnull
    return (
        <div className='card-item'>
            <div className='card-image' onClick={() => onClickToDetail(item.idStrain)}>
                <img className='image-strain' src={imageSrc} alt={item.scientificName} />
                <IoHeartCircleOutline className="icon-heart" />
            </div>

            <div className="card-text">
                <h3 className="name">{item.scientificName}</h3>
                <p className="number">{item.strainNumber}</p>
                <p className="price">{formatCurrency(item.price)} VNĐ</p>
                <p className="des"><strong>Kích thước:</strong> {item.cellSize}</p>
                <p className="status"><strong>Tình trạng:</strong> <span style={{color: statusStock ? 'green' : 'red'}}>{statusStock ? 'Còn hàng' : 'Hết hàng'}</span></p>
                <button className='btn-buy' onClick={() => onClickToDetail(item.idStrain)}>MUA NGAY</button>
            </div>

        </div>
    )
}

export default ItemProduct