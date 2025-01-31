import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000, // 10 second timeout
    withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            error: error.message
        });

        // Network Error
        if (!error.response) {
            return Promise.reject({
                success: false,
                message: 'Network error. Please check your connection and try again.',
                error: error.message
            });
        }

        // Authentication Error
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/auth';
            return Promise.reject({
                success: false,
                message: 'Session expired. Please login again.'
            });
        }

        // Server Error
        if (error.response.status >= 500) {
            return Promise.reject({
                success: false,
                message: 'Server error. Please try again later.',
                error: error.response.data
            });
        }

        // Return the error response data if it exists
        return Promise.reject(error.response?.data || {
            success: false,
            message: 'An error occurred. Please try again.'
        });
    }
);

// Retry mechanism for failed requests
const retryRequest = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        console.log(`Request failed, retrying... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryRequest(fn, retries - 1, delay * 2);
    }
};

// Auth services
export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    register: (userData) => api.post('/auth/register', userData),
    getCurrentUser: () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        return api.get('/auth/me');
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// Order services
export const orderService = {
    createOrder(orderData) {
        return api.post('/orders', orderData);
    },
    
    getMyOrders() {
        return api.get('/orders/my-orders');
    },
    
    getOrderById(orderId) {
        return api.get(`/orders/${orderId}`);
    },
    
    cancelOrder(orderId) {
        return api.post(`/orders/${orderId}/cancel`);
    }
};

// Pet services
export const petService = {
    getAllPets: () => api.get('/pets'),
    getPetById: (id) => api.get(`/pets/${id}`),
    createPet: (petData) => api.post('/pets', petData),
    updatePet: (id, petData) => api.put(`/pets/${id}`, petData),
    deletePet: (id) => api.delete(`/pets/${id}`)
};

// Accessories services
export const accessoryService = {
    getAllAccessories: (params = {}) => api.get('/accessories', { params }),
    getAccessoryById: (id) => api.get(`/accessories/${id}`),
    createAccessory: (accessoryData) => api.post('/accessories', accessoryData),
    updateAccessory: (id, accessoryData) => api.put(`/accessories/${id}`, accessoryData),
    deleteAccessory: (id) => api.delete(`/accessories/${id}`),
    getByCategory: (category) => api.get(`/accessories/category/${category}`),
    getByPetType: (petType) => api.get(`/accessories/pet-type/${petType}`)
};

export default api;
