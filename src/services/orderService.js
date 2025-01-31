const API_BASE_URL = 'http://localhost:5001/api';

export const createOrder = async (orderData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create order');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch orders');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const getOrder = async (orderId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch order');
        }

        return data;
    } catch (error) {
        throw error;
    }
};
