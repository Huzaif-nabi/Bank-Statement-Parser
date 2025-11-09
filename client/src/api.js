import axios from 'axios';

// The VITE_API_BASE_URL should be defined in a .env file in the client directory (e.g., VITE_API_BASE_URL=http://localhost:5000)
// If not defined, it defaults to http://localhost:5000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; 

const api = axios.create({
    baseURL: API_BASE_URL,
    // Note: 'Content-Type' is set here for standard JSON requests, 
    // but overridden below for the file upload POST request.
    headers: {
        'Content-Type': 'application/json', 
    },
});

/**
 * Uploads the bank statement file (PDF) to the backend for parsing.
 * @param {File} file The PDF file object.
 * @returns {Promise<any>} The response from the server containing parsed data.
 */
export const uploadStatement = (file) => {
    const formData = new FormData();
    // 'statement' must match the key used in the backend's Multer setup (upload.single('statement'))
    formData.append('statement', file); 

    // IMPORTANT: We use '/api/upload' to match the backend Express route definition.
    return api.post('/api/upload', formData, {
        headers: {
            // Setting this header tells the server we are sending multipart form data (a file).
            'Content-Type': 'multipart/form-data', 
        },
    });
};

export default api;