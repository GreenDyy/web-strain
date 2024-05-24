import React from "react";
import './TestArea.scss'
import { MdOutlineMail } from "react-icons/md";
function TestArea() {

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="TestArea">
      <div className="wrap-dropdown">
        <div className="trigger-dropdown">
          Chọn
          <MdOutlineMail />
        </div>
        <ul>
        {days.map((item)=>
          <li>{item}</li>
        )}
        </ul>
      </div>
    </div>
  );
}

export default TestArea