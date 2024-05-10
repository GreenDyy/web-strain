import React, { useState } from 'react';
import './Dropdown.scss';

const Dropdown = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="dropdown-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="dropdown-trigger">
                <span>Hover vào đây</span>
            </div>
            {isHovered && (
                <div className="dropdown-content" style={{ position: 'absolute' }}>
                    {/* Nội dung của dropdown */}
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
