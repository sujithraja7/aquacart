import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Alert,
    CircularProgress,
    Box,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import qrimg from '../images/qrimg.png';

const Order = () => {
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        paymentMethod: 'cod',
        paymentStatus: 'pending'
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        if (!cart || cart.length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Reset payment status when switching payment methods
        if (name === 'paymentMethod') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                paymentStatus: 'pending'
            }));

            // Show QR code dialog when UPI is selected
            if (value === 'upi') {
                setShowQRCode(true);
            }
        }
    };

    const handleCloseQRCode = () => {
        if (formData.paymentStatus !== 'completed') {
            setFormData(prev => ({
                ...prev,
                paymentMethod: 'cod'
            }));
        }
        setShowQRCode(false);
    };

    const handlePaymentConfirm = () => {
        setShowQRCode(false);
        setFormData(prev => ({
            ...prev,
            paymentStatus: 'completed'
        }));
        setSuccess('UPI payment confirmed! You can now place your order.');
    };

    const validateForm = () => {
        const required = ['fullName', 'addressLine1', 'city', 'state', 'postalCode', 'phone'];
        for (let field of required) {
            if (!formData[field]?.trim()) {
                setError(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
                return false;
            }
        }
        
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone?.trim())) {
            setError('Please enter a valid 10-digit phone number');
            return false;
        }

        const postalCodeRegex = /^[0-9]{6}$/;
        if (!postalCodeRegex.test(formData.postalCode?.trim())) {
            setError('Please enter a valid 6-digit postal code');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        if (!validateForm()) {
            return;
        }

        if (!cart || cart.length === 0) {
            setError('Your cart is empty');
            return;
        }

        if (formData.paymentMethod === 'upi' && formData.paymentStatus !== 'completed') {
            setError('Please complete the UPI payment before placing the order');
            setShowQRCode(true);
            return;
        }

        setLoading(true);

        try {
            // Ensure all items have valid IDs and correct type field
            const formattedItems = cart.map(item => {
                const itemId = item._id || item.id;
                if (!itemId) {
                    throw new Error('Invalid item ID in cart');
                }
                
                return {
                    id: itemId,
                    type: item.type?.toLowerCase() === 'fish' ? 'pet' : 'accessory',
                    quantity: item.quantity,
                    price: item.price,
                    name: item.name,
                    imageUrl: item.imageUrl || ''
                };
            });

            const orderData = {
                ...formData,
                items: formattedItems,
                total: getCartTotal()
            };

            console.log('Sending order data:', orderData);

            const response = await createOrder(orderData);

            if (response.success) {
                setSuccess('Order placed successfully!');
                clearCart();
                setTimeout(() => {
                    navigate('/order-confirmation', { 
                        state: { 
                            order: response.order,
                            success: true 
                        }
                    });
                }, 1500);
            } else {
                setError(response.message || 'Failed to place order');
            }
        } catch (err) {
            console.error('Order error:', err);
            if (err.message === 'Authentication required') {
                navigate('/login');
            } else {
                setError(err.message || 'Failed to place order. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container sx={{ 
                py: 8, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ color: '#1a237e' }}>
                        Checkout
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    Shipping Information
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Full Name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Address Line 1"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address Line 2 (Optional)"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Postal Code"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 6 }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 10 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Payment Method</FormLabel>
                                    <RadioGroup
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel 
                                            value="cod" 
                                            control={<Radio />} 
                                            label="Cash on Delivery" 
                                        />
                                        <FormControlLabel 
                                            value="upi" 
                                            control={<Radio />} 
                                            label="UPI Payment" 
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6">
                                        Total Amount: ₹{getCartTotal()}
                                    </Typography>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        disabled={loading}
                                    >
                                        Place Order
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>

            <Dialog open={showQRCode} onClose={handleCloseQRCode}>
                <DialogTitle>Scan QR Code to Pay</DialogTitle>
                <DialogContent>
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                        <img src={qrimg} alt="UPI QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Amount: ₹{getCartTotal()}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseQRCode} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handlePaymentConfirm} color="primary" variant="contained">
                        Confirm Payment
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Order;
