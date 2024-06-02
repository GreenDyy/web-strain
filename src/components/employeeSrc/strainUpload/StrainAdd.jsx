import React from "react";
import './StrainAdd.scss'
import { images } from "../../../constants";
import { RxDropdownMenu } from "react-icons/rx";
import { toastSuccess } from '../../Toast/Toast';

const StrainAdd = ({ handleCloseModal }) => {

    const handleAddStrain = ()=>{
        toastSuccess("Thêm thành công")
    }
    return (
        <div className="StrainAdd">
            <div className="modal">
                <div className="header-title">
                    <h2 className="title-work">Thêm chủng mới</h2>
                    <button className="btn-back" onClick={handleCloseModal}>Quay lại</button>
                </div>

                <div className="content">
                    <div className="wrap-all-input">
                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Scientific Name</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Synonym Name</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Former Name</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Common Name</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Cell Size</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Organization</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Characteristics</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input" style={{ width: '70%' }}>
                                <p className="label">Colection Site</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Continent</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Country</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Isolation Source</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Toxin Producer</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">State of Strain</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Agitation Resistance</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Remarks</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>
                            <div className="wrap-input" style={{ width: '70%' }}>
                                <p className="label">Gene Information</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Publications</p>
                                <div className="input-box">
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="wrap-input" style={{ width: '70%' }}>
                                <p className="label">Recommended For Teaching</p>
                                <div className="input-box">
                                    <input type="text" />
                                    <button className="btn-choose"><RxDropdownMenu /></button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-2">
                        <div className="wrap-input">
                            <p className="label">Image Strain</p>
                            <div className="input-box">
                                <input type="text" />
                            </div>
                            <img src={images.strainnull} />
                        </div>
                        <button className="btn-add" onClick={handleAddStrain}>Thêm chủng mới</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StrainAdd