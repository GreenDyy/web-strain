import React from 'react'
import './Contact.scss'
import { IoPhonePortraitSharp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { images } from '../../constants';

function Contact() {
    return (
        <div className='Contact'>
            <div className="row-banner">
                <img className="banner" src={images.bannerintro} />
            </div>

            <h1 className='title-contact-main'>LIÊN HỆ CHÚNG TÔI</h1>

            <div className='wrap-all-contact'>
                <div className='wrap-item-contact'>
                    <div className='card-img'>
                        <IoPhonePortraitSharp className='icon-contact' />
                    </div>
                    <h2 className='title-contact'>ĐIỆN THOẠI</h2>
                    <p>+8476273849</p>
                </div>
                <div className='wrap-item-contact'>
                    <div className='card-img'>
                        <MdOutlineMail className='icon-contact' />
                    </div>
                    <h2 className='title-contact'>EMAIL</h2>
                    <p>daqstrain@gmail.com</p>
                    <iframe width="350" height="200" src="https://www.youtube.com/embed/jXM4evAEfzM"
                        title="Sau Cơn Mưa - CoolKid ft. Rhyder || Lyrics Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                        style={{borderRadius: 10}}>
                    </iframe>
                </div>

                <div className='wrap-item-contact'>
                    <div className='card-img'>
                        <FaMapMarkedAlt className='icon-contact' />
                    </div>
                    <h2 className='title-contact'>ĐỊA CHỈ</h2>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d979.7963909034345!2d106.63028187224128!3d10.79709543731004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDQ3JzQ3LjkiTiAxMDbCsDM3JzU0LjkiRQ!5e0!3m2!1svi!2s!4v1718386340267!5m2!1svi!2s"
                        width="350"
                        height="250"
                        style={{ border: 0, borderRadius: 10 }}
                        allowfullscreen=""
                        loading="lazy"
                    ></iframe>

                    <p>29/2C, Nguyễn Văn Quá, Phường 7, Quận 3, TP. HCM</p>
                </div>
            </div>
        </div>
    )
}

export default Contact