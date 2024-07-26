import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const getAllCompanies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/companies`);
        return response.data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
};

export const getCompanyDetails = async (companyId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/companies/${companyId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching company details for ID ${companyId}:`, error);
        throw error;
    }
};

export const getCompanyLocations = async (companyId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/companies/${companyId}/locations`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching locations for company ID ${companyId}:`, error);
        throw error;
    }
};
