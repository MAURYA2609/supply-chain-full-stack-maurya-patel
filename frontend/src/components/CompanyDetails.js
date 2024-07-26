import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getCompanyDetails, getCompanyLocations } from '../ApiService';

const CompanyDetails = () => {
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const data = await getCompanyDetails(companyId);
                setCompany(data);
            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        };

        const fetchCompanyLocations = async () => {
            try {
                const data = await getCompanyLocations(companyId);
                setLocations(data);
            } catch (error) {
                console.error('Error fetching company locations:', error);
            }
        };

        fetchCompanyDetails();
        fetchCompanyLocations();
    }, [companyId]);

    if (!company) return <div>Loading...</div>;

    return (
        <div className="company-details">
            <h2>{company.name}</h2>
            <p>{company.address}</p>
            <MapContainer center={[company.latitude, company.longitude]} zoom={15} className="leaflet-container">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[company.latitude, company.longitude]}>
                    <Popup>{company.name}</Popup>
                </Marker>
                {locations.map(location => (
                    <Marker key={location.location_id} position={[location.latitude, location.longitude]}>
                        <Popup>{location.name}<br />{location.address}</Popup>
                    </Marker>
                ))}
            </MapContainer>
            <Link to="/">Back to List</Link>
        </div>
    );
};

export default CompanyDetails;
