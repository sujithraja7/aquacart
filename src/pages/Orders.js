import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Grid,
    Divider,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Chip,
    Avatar
} from '@mui/material';
import { orderService } from '../services/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderService.getMyOrders();
            if (response.success) {
                setOrders(response.orders || []);
            } else {
                setError(response.message || 'Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError(error.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'warning';
            case 'processing':
                return 'info';
            case 'shipped':
                return 'primary';
            case 'delivered':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {orders.length === 0 ? (
                <Alert severity="info">
                    You haven't placed any orders yet.
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid item xs={12} key={order._id}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6">
                                            Order #{order._id?.slice(-6)}
                                        </Typography>
                                        <Chip
                                            label={order.status || 'Processing'}
                                            color={getStatusColor(order.status)}
                                            size="small"
                                        />
                                    </Box>

                                    <Typography color="text.secondary" gutterBottom>
                                        Placed on: {formatDate(order.createdAt)}
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    {order.items?.map((item, index) => (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                {item.imageUrl && (
                                                    <Avatar
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        sx={{ width: 50, height: 50 }}
                                                        variant="rounded"
                                                    />
                                                )}
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography>
                                                            {item.name} 
                                                            <Typography component="span" color="text.secondary">
                                                                {' x '}{item.quantity}
                                                            </Typography>
                                                        </Typography>
                                                        <Typography>
                                                            ₹{(item.price * item.quantity).toFixed(2)}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Type: {item.type}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="subtitle1">Total Amount</Typography>
                                        <Typography variant="subtitle1" color="primary">
                                            ₹{order.total?.toFixed(2)}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Shipping Address:
                                        </Typography>
                                        <Typography variant="body2">
                                            {order.fullName}
                                        </Typography>
                                        <Typography variant="body2">
                                            {order.addressLine1}
                                        </Typography>
                                        {order.addressLine2 && (
                                            <Typography variant="body2">
                                                {order.addressLine2}
                                            </Typography>
                                        )}
                                        <Typography variant="body2">
                                            {order.city}, {order.state} {order.postalCode}
                                        </Typography>
                                        <Typography variant="body2">
                                            Phone: {order.phone}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Orders;
