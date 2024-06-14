import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Content from './components/content/Content';
import ContentEmployee from './components/employeeSrc/contentemployee/ContentEmployee';
import { Route, Routes } from 'react-router-dom';
import FooterV2 from './components/footer/FooterV2';

const CustomerLayout = () => {
    return (
        <div className='container'>
            {/* header */}
            <Navbar />
            {/* body */}
            <Content />
            {/* footer */}
            {/* <Footer /> */}
            <FooterV2/>
        </div>
    );
}

const EmployeeLayout = () => {
    return (
        <div className='container'>
            <ContentEmployee />
        </div>
    );
}

// SPA here
function App() {
    return (
        <Routes>
            <Route path="/*" element={<CustomerLayout />} />
            <Route path="/Employee/*" element={<EmployeeLayout />} />
        </Routes>
    );
}

export default App;
