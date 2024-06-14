import React, { useEffect, useState } from "react";
import './NavbarEmployee.scss'
import { MdOutlineNotificationsActive } from "react-icons/md";
import DrawerRight from "../drawerRight/DrawerRight";
import { images } from "../../../constants";
import { convertImageByte } from "../../../utils/Utils";

function NavbarEmployee({ employee, setScreenName }) {
    const [showDrawerRight, setShowDrawerRight] = useState(false)

    const [time, setTime] = useState()
    const [day, setDay] = useState()
    const [daytOfWeek, setDayOfWeek] = useState()
    const dayOfWeeks = ['Thứ bảy', 'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu']

    useEffect(() => {
        const intervalId = setInterval(() => {
            const dateObject = new Date();

            const hour = dateObject.getHours();
            const minute = dateObject.getMinutes();
            // const second = dateObject.getSeconds();

            const dayOfWeek = dayOfWeeks[dateObject.getDay()]
            const dayOfMonth = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();

            const currentTime = `${hour}:${minute}  `
            const currentDay = `${dayOfMonth}.${month}.${year}`

            setTime(currentTime)
            setDay(currentDay)
            setDayOfWeek(dayOfWeek)
        }, 1000);

        // Xóa interval khi component bị unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="NavbarEmployee">
            {/* <MdOutlineNotificationsActive className="notification" /> */}

            <div className="clock">
                <p className="time">{time}</p>
                <p className="day">{daytOfWeek} {day}</p>

            </div>

            <div className="wrap-avatar-name">
                <div className="wrap-name-nav">
                    <p className="name">{employee?.fullName}</p>
                    <p className="role">Nghiên cứu viên</p>
                </div>
                <img src={employee?.imageEmployee ? convertImageByte(employee?.imageEmployee) : images.avatarnull}
                    onClick={() => setShowDrawerRight(true)}
                />

            </div>

            {showDrawerRight &&
                <DrawerRight handleCloseDrawerRight={() => setShowDrawerRight(false)} setScreenName={setScreenName} employee={employee} />}
        </div>
    )
}

export default NavbarEmployee