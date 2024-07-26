import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import CompanyDetails from './components/CompanyDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Router>
            <div className="app">
                <Header onSearch={handleSearch} />
                <div className="main">
                    <Sidebar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<CompanyList onSearch={searchQuery} />} />
                            <Route path="/details/:companyId" element={<CompanyDetails />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
