import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCompanies } from '../ApiService';

const CompanyList = ({ onSearch }) => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = await getAllCompanies();
                setCompanies(data);
                setFilteredCompanies(data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    useEffect(() => {
        setFilteredCompanies(companies.filter(company => company.name.toLowerCase().includes(onSearch.toLowerCase())));
    }, [onSearch, companies]);

    return (
        <div className="container mt-4">
            <div className="row">
                {filteredCompanies.map(company => (
                    <div key={company.company_id} className="col-md-4 mb-4">
                        <Link to={`/details/${company.company_id}`} className="text-decoration-none text-dark">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{company.name}</h5>
                                    <p className="card-text">{company.address}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyList;
