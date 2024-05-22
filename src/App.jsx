import React, { useState, useEffect } from 'react';
import './App.css'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer';
import Content from './components/content/Content';

//SPA ở đây
function App() {
    return (
        <div className='container'>
            {/* hearder */}
            <Navbar />
            {/* body */}
            <Content />

            {/* footer */}
            <Footer />
        </div>
    );
}
export default App;
