import React from "react";
// const steps = ['Đang chờ xử lý', 'Đang được xử lý', 'Đang vận chuyển', 'Đã hoàn thành']
import { MdDeliveryDining, MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineCodeSandbox, AiFillCheckCircle } from "react-icons/ai";

const DangChoXuLy = () => (
    <p style={{fontSize: 14, display: 'flex', alignItems: 'center', textAlign: 'center', borderRadius: 90, padding: '3px 10px', background: '#9350F0', color: 'white' }}>
        <MdOutlinePendingActions style={{ fontSize: 18, marginRight: 5 }} />Đang chờ xử lý
    </p>
)

const DangDuocXuLy = () => (
    <p style={{fontSize: 14,  display: 'flex', alignItems: 'center', textAlign: 'center', borderRadius: 90, padding: '3px 10px', background: '#00A551', color: 'white' }}>
        <AiOutlineCodeSandbox style={{ fontSize: 18, marginRight: 5 }} />Đang được xử lý
    </p>
)

const DangVanChuyen = () => (
    <p style={{fontSize: 14,  display: 'flex', alignItems: 'center', textAlign: 'center', borderRadius: 90, padding: '3px 10px', background: '#525CEB', color: 'white' }}>
        <MdDeliveryDining style={{ fontSize: 18, marginRight: 5 }} />Đang vận chuyển
    </p>
)

const DaHoanThanh = () => (
    <p style={{fontSize: 14,  display: 'flex', alignItems: 'center', textAlign: 'center', borderRadius: 90, padding: '3px 10px', background: '#0094F0', color: 'white' }}>
        <AiFillCheckCircle style={{ fontSize: 18, marginRight: 5 }} />Đã hoàn thành
    </p>
)

export {
    DangChoXuLy,
    DangDuocXuLy,
    DangVanChuyen,
    DaHoanThanh
}