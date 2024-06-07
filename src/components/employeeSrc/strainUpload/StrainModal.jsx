import React, { useEffect, useRef, useState } from "react";
import './StrainModal.scss'
import { images } from "../../../constants";
import { RxDropdownMenu } from "react-icons/rx";
import { toastError, toastSuccess, toastWarning } from '../../Toast/Toast';
import { convertImageByte } from "../../../utils/Utils";
import { addIsolatorStrainApi, addStrainApi, addStrainApprovalHistoryApi, getAllConditionApi, getAllSpeciesApi } from "../../../apis/apiStrain";

const StrainModal = ({ strain = {}, handleCloseModal, employee, onUpdateData }) => {
    const [dataSpeices, setDataSpecies] = useState([])
    const [dataCondition, setDataCondition] = useState([])
    const [showDropdownSpecies, setShowDropdownSpecies] = useState(false)
    const [showDropdownCondition, setShowDropdownCondition] = useState(false)
    const [showDropdownRcm, setShowDropdownRcm] = useState(false)
    const [processing, setProcessing] = useState(false)
    const dropdownSpeciesRef = useRef(null);
    const dropdownConditionRef = useRef(null);
    const dropdownRcmRef = useRef(null);

    const [dataStrain, setDataStrain] = useState({
        idCondition: '',
        idSpecies: '',
        scientificName: '',
        synonymStrain: '',
        formerName: '',
        commonName: '',
        cellSize: '',
        organization: '',
        characteristics: '',
        collectionSite: '',
        continent: '',
        country: '',
        isolationSource: '',
        toxinProducer: '',
        stateOfStrain: '',
        agitationResistance: '',
        remarks: '',
        geneInformation: '',
        publications: '',
        recommendedForTeaching: '',
        imageStrain: '',
        dateAdd: new Date().toJSON().slice(0, 10)
    })
    const inputImgRef = useRef(null)
    const dataRecommendedForTeaching = ['Yes', 'No']
    useEffect(() => {
        const fetchData = async () => {
            const species = await getAllSpeciesApi()
            const conditions = await getAllConditionApi()
            setDataSpecies(species.data)
            setDataCondition(conditions.data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownSpeciesRef.current && !dropdownSpeciesRef.current.contains(event.target)) {
                setShowDropdownSpecies(false);
            }
            if (dropdownConditionRef.current && !dropdownConditionRef.current.contains(event.target)) {
                setShowDropdownCondition(false);
            }
            if (dropdownRcmRef.current && !dropdownRcmRef.current.contains(event.target)) {
                setShowDropdownRcm(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setDataStrain({ ...strain })
    }, [strain])

    const handleOnChance = (key, value) => {
        let temp = { ...dataStrain }
        temp[key] = value
        setDataStrain(temp)
    }
    const validateStrainInput = () => {
        const requiredFields = [
            'idCondition', 'idSpecies', 'scientificName', 'synonymStrain', 'formerName', 'commonName', 'cellSize', 'organization',
            'characteristics', 'collectionSite', 'continent', 'country', 'isolationSource', 'toxinProducer',
            'stateOfStrain', 'agitationResistance', 'remarks', 'geneInformation', 'publications', 'recommendedForTeaching'
        ];

        for (const field of requiredFields) {

            if (dataStrain[field] === '' || dataStrain[field] === undefined) {
                return false
            }
        }
        return true
    }
    const handleUpdateStrain = async () => {
        if (!validateStrainInput()) {
            toastWarning('Vui lòng điền đầy đủ thông tin')
            return
        }

    }

    const handleAddStrain = async () => {
        try {
            if (!validateStrainInput()) {
                toastWarning('Vui lòng điền đầy đủ thông tin')
                return
            }
            setProcessing(true)
            const newStrain = { ...dataStrain, dateAdd: new Date().toJSON().slice(0, 10) }
            const response = await addStrainApi(newStrain) //lấy id cuối ra để thêm cho bảng đưới
            console.log('response', response.data)
            await addIsolatorStrainApi({
                iD_Employee: employee?.idEmployee,
                iD_Strain: response.data?.idStrain,
                yearOfIsolator: new Date().getFullYear()
            })
            await addStrainApprovalHistoryApi(response.data?.idStrain)
            toastSuccess('Thêm thành công')
            onUpdateData()//cài này dc gọi, thì nó sẽ dùng logic dc định nghĩa từ component cha để thực thi
            setDataStrain({
                idCondition: '',
                idSpecies: '',
                scientificName: '',
                synonymStrain: '',
                formerName: '',
                commonName: '',
                cellSize: '',
                organization: '',
                characteristics: '',
                collectionSite: '',
                continent: '',
                country: '',
                isolationSource: '',
                toxinProducer: '',
                stateOfStrain: '',
                agitationResistance: '',
                remarks: '',
                geneInformation: '',
                publications: '',
                recommendedForTeaching: '',
                imageStrain: '',
                dateAdd: new Date().toJSON().slice(0, 10)
            })
            setProcessing(false)
        }
        catch (e) {
            toastError(`Lỗi ${e}`)
        }
    }
    const handleOpenPickImage = () => {
        inputImgRef.current.click()
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setDataStrain({ ...dataStrain, imageStrain: reader.result.split(',')[1] });
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="StrainModal">
            <div className="modal">
                <div className="header-title">
                    <h2 className="title-work">{strain ? 'Cập nhật thông tin chủng' : 'Thêm chủng mới'}</h2>
                    <button className="btn-back" onClick={handleCloseModal}>Quay lại</button>
                </div>

                <div className="content">
                    <div className="wrap-all-input">
                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Scientific Name<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.scientificName}
                                        onChange={(event) => handleOnChance('scientificName', event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Synonym Name<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.synonymStrain}
                                        onChange={(event) => handleOnChance('synonymStrain', event.target.value,)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Former Name<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.formerName}
                                        onChange={(event) => handleOnChance('formerName', event.target.value,)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Common Name<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.commonName}
                                        onChange={(event) => handleOnChance('commonName', event.target.value,)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Cell Size<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.cellSize}
                                        onChange={(event) => handleOnChance('cellSize', event.target.value,)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Organization<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.organization}
                                        onChange={(event) => handleOnChance('organization', event.target.value,)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row" ref={dropdownSpeciesRef}>
                            <div className="wrap-input" style={{ width: '50%' }}>
                                <p className="label">Species<span style={{ color: 'red' }}>*</span></p>

                                <div className="input-box">
                                    <input type="text" value={dataStrain.idSpecies}
                                        onChange={(event) => handleOnChance('idSpecies', event.target.value,)}
                                        disabled
                                    />
                                    <button className="btn-choose" onClick={() => setShowDropdownSpecies(!showDropdownSpecies)}><RxDropdownMenu /></button>
                                </div>
                                {showDropdownSpecies &&
                                    <div className='dropdown-content'>
                                        {dataSpeices?.map((item, index) => (
                                            <div key={index} className='wrap-text'
                                                onClick={() => {
                                                    handleOnChance('idSpecies', item?.idSpecies)
                                                    setShowDropdownSpecies(false)
                                                }}>
                                                <p className='title-item'>{item?.idSpecies}</p>
                                                <p className='number-item'>{item?.nameSpecies}</p>
                                            </div>
                                        ))}
                                    </div>
                                }

                            </div>
                            <div className="wrap-input" style={{ width: '50%' }} ref={dropdownConditionRef}>
                                <p className="label">Condition<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.idCondition}
                                        onChange={(event) => handleOnChance('idCondition', event.target.value,)}
                                        disabled
                                    />
                                    <button className="btn-choose" onClick={() => setShowDropdownCondition(!showDropdownCondition)}><RxDropdownMenu /></button>
                                </div>

                                {showDropdownCondition &&
                                    <div className='dropdown-content'>
                                        {dataCondition?.map((item, index) => (
                                            <div key={index} className='wrap-text'
                                                onClick={() => {
                                                    handleOnChance('idCondition', item?.idCondition)
                                                    setShowDropdownCondition(false)
                                                }}>
                                                <p className='title-item'>{item?.idCondition}</p>
                                                <p className='number-item'>{item?.medium + '-' + item?.temperature + '-' + item?.lightIntensily + '-' + item?.duration}</p>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Characteristics</p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.characteristics}
                                        onChange={(event) => handleOnChance('characteristics', event.target.value,)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input" style={{ width: '70%' }}>
                                <p className="label">Colection Site<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.collectionSite}
                                        onChange={(event) => handleOnChance('collectionSite', event.target.value,)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Continent<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.continent}
                                        onChange={(event) => handleOnChance('continent', event.target.value,)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Country</p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.country}
                                        onChange={(event) => handleOnChance('country', event.target.value,)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Isolation Source</p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.isolationSource}
                                        onChange={(event) => handleOnChance('isolationSource', event.target.value,)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Toxin Producer</p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.toxinProducer}
                                        onChange={(event) => handleOnChance('toxinProducer', event.target.value,)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">State Of Strain</p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.stateOfStrain}
                                        onChange={(event) => handleOnChance('stateOfStrain', event.target.value,)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <p className="label">Agitation Resistance</p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.agitationResistance}
                                        onChange={(event) => handleOnChance('agitationResistance', event.target.value,)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Remarks<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.remarks}
                                        onChange={(event) => handleOnChance('remarks', event.target.value,)}
                                    />
                                </div>
                            </div>
                            <div className="wrap-input" style={{ width: '70%' }}>
                                <p className="label">Gene Information</p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.geneInformation}
                                        onChange={(event) => handleOnChance('geneInformation', event.target.value,)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="wrap-row">
                            <div className="wrap-input">
                                <p className="label">Publications</p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.publications}
                                        onChange={(event) => handleOnChance('publications', event.target.value,)}
                                    />
                                </div>
                            </div>

                            <div className="wrap-input" style={{ width: '70%' }}>
                                <p className="label">Recommended For Teaching<span style={{ color: 'red' }}>*</span></p>
                                <div className="input-box">
                                    <input type="text" value={dataStrain.recommendedForTeaching}
                                        onChange={(event) => handleOnChance('recommendedForTeaching', event.target.value,)}
                                        disabled
                                    />
                                    <button className="btn-choose" onClick={() => setShowDropdownRcm(!showDropdownRcm)}><RxDropdownMenu /></button>
                                </div>
                                {showDropdownRcm &&
                                    <div className='dropdown-content'>
                                        {dataRecommendedForTeaching.map((item, index) => (
                                            <div key={index} className='wrap-text' onClick={() => {
                                                handleOnChance('recommendedForTeaching', item)
                                                setShowDropdownRcm(false)
                                            }}>
                                                <p className='title-item'>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                    <div className="col-2">
                        <div className="wrap-input">
                            <p className="label">Image Strain</p>
                            <div className="input-box">
                                <input type="text" value={dataStrain.imageStrain}
                                    onChange={(event) => handleOnChance('imageStrain', event.target.value,)}
                                    disabled />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={inputImgRef}
                                    onChange={handleImageChange}
                                    hidden
                                />
                            </div>

                            <div className="card-image" onClick={handleOpenPickImage}>
                                <img src={dataStrain?.imageStrain ? convertImageByte(dataStrain?.imageStrain) : images.strainnull} />
                            </div>

                        </div>
                        {strain ?
                            <>
                                <p className="strain-chua-duyet">ĐANG CHỜ XÉT DUYỆT</p>
                                <button className="btn-update" onClick={handleUpdateStrain}>Cập nhật</button>
                            </>

                            :
                            <>
                                <p className="strain-da-duyet">ĐÃ DUYỆT</p>
                                <button className={`btn-add ${processing ? 'disable' : ''}`} onClick={handleAddStrain} disabled={processing}>Thêm chủng mới</button>
                            </>

                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StrainModal