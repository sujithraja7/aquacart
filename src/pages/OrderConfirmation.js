import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Button,
    Grid,
    Divider,
    Chip
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    LocalShipping as LocalShippingIcon,
    Payment as PaymentIcon,
    Home as HomeIcon,
    ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { order, success } = location.state || {};

    if (!order) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h5" color="error">
                        No order information found
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/shop')}
                        sx={{ mt: 2 }}
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            </Container>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ 
                p: 4, 
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
            }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <CheckCircleIcon sx={{ 
                        fontSize: 64, 
                        color: 'success.main',
                        mb: 2
                    }} />
                    <Typography variant="h4" gutterBottom sx={{ color: '#1a237e' }}>
                        Order Confirmed!
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Thank you for your purchase. Your order has been received.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        {/* Order Details */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1a237e', display: 'flex', alignItems: 'center' }}>
                                <LocalShippingIcon sx={{ mr: 1 }} />
                                Order Details
                            </Typography>
                            <Paper sx={{ p: 2, background: 'rgba(255, 255, 255, 0.7)' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Order Date
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate(order.orderDate)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Payment Method
                                        </Typography>
                                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <PaymentIcon sx={{ mr: 1, fontSize: 20 }} />
                                            {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI Payment'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>

                        {/* Items */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                                Order Items
                            </Typography>
                            {order.items.map((item, index) => (
                                <Paper 
                                    key={index} 
                                    sx={{ 
                                        p: 2, 
                                        mb: 2,
                                        background: 'rgba(255, 255, 255, 0.7)',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.imageUrl}
                                        alt={item.name}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                            mr: 2
                                        }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle1" sx={{ color: '#1a237e' }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ₹{item.price} each
                                        </Typography>
                                    </Box>
                                    <Typography variant="subtitle1" sx={{ color: '#1a237e' }}>
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        {/* Payment Status */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1a237e', display: 'flex', alignItems: 'center' }}>
                                <PaymentIcon sx={{ mr: 1 }} />
                                Payment Status
                            </Typography>
                            <Paper sx={{ p: 2, background: 'rgba(255, 255, 255, 0.7)' }}>
                                <Chip
                                    label={order.paymentStatus === 'completed' ? 'Payment Completed' : 'Payment Pending'}
                                    color={order.paymentStatus === 'completed' ? 'success' : 'warning'}
                                    sx={{ width: '100%' }}
                                />
                                <Typography variant="h6" sx={{ mt: 2, color: '#1a237e' }}>
                                    Total: ₹{order.total.toFixed(2)}
                                </Typography>
                            </Paper>
                        </Box>

                        {/* Shipping Address */}
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1a237e', display: 'flex', alignItems: 'center' }}>
                                <HomeIcon sx={{ mr: 1 }} />
                                Shipping Address
                            </Typography>
                            <Paper sx={{ p: 2, background: 'rgba(255, 255, 255, 0.7)' }}>
                                <Typography variant="body1">
                                    {order.fullName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {order.addressLine1}
                                    {order.addressLine2 && <><br />{order.addressLine2}</>}
                                    <br />
                                    {order.city}, {order.state}
                                    <br />
                                    {order.postalCode}
                                    <br />
                                    Phone: {order.phone}
                                </Typography>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<ShoppingBagIcon />}
                        onClick={() => navigate('/orders')}
                    >
                        View All Orders
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/shop')}
                        sx={{ 
                            color: '#1a237e',
                            borderColor: '#1a237e',
                            '&:hover': {
                                borderColor: '#0d47a1',
                                backgroundColor: 'rgba(26, 35, 126, 0.04)'
                            }
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default OrderConfirmation;
