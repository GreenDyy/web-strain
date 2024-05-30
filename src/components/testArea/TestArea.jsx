import React, { useState, useEffect } from "react";
import './TestArea.scss'
import { MdOutlineMail } from "react-icons/md";

function TestArea() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [networkConnected, setNetworkConnected] = useState(true);
    useEffect(() => {
        // Simulate data loading (you can replace this with your actual data fetching logic)
        setTimeout(() => {
            setDataLoaded(true);
        }, 3000);

        // Simulate network connection (you can replace this with your actual network status check)
        setTimeout(() => {
            setNetworkConnected(false);
        }, 5000);
    }, []);
    return (
        <div>
        
    </div>
    );
}

export default TestArea