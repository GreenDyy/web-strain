import React, { useState, useEffect } from 'react';
import './App.css'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer';
import Content from './components/content/Content';

//SPA ở đây
function App() {
    const currentTheme = localStorage.getItem('currentTheme')
    const [theme, setTheme] = useState(currentTheme ? currentTheme : 'light')

    useEffect(() => {
        localStorage.setItem('currentTheme', theme)
    }, [theme])
    return (
        <div className={`container ${theme}`}>

            {/* hearder */}
            <Navbar theme={theme} setTheme={setTheme} />
            {/* body */}
            <Content />

            {/* footer */}
            <Footer />
        </div>
    );
}
export default App;
