import { Container, Typography, Grid, Box, IconButton, Button, Card } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import qrimg from '../images/qrimg.png';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const navigate = useNavigate();

    if (!cart || cart.length === 0) {
        return (
            <Container 
                maxWidth="lg" 
                sx={{ 
                    py: 8,
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ color: '#1a237e' }}>
                    Your cart is empty
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/shop')}
                    sx={{
                        mt: 2,
                        bgcolor: '#1a237e',
                        '&:hover': {
                            bgcolor: '#0d47a1'
                        }
                    }}
                >
                    Continue Shopping
                </Button>
            </Container>
        );
    }

    const cartTotal = getCartTotal();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', mb: 4, textAlign: 'center' }}>
                Shopping Cart
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box sx={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 3
                    }}>
                        {cart.map((item) => (
                            <Card 
                                key={`${item.type}-${item.id}`} 
                                sx={{
                                    mb: 2,
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                <Grid container spacing={2} sx={{ p: 2, alignItems: 'center' }}>
                                    <Grid item xs={12} sm={3}>
                                        <Box
                                            component="img"
                                            src={item.imageUrl}
                                            alt={item.name}
                                            sx={{
                                                width: '100%',
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: 1
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6" sx={{ color: '#1a237e' }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.type === 'pet' ? 'Pet' : 'Accessory'}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: '#1a237e', mt: 1 }}>
                                            ₹{item.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <IconButton 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                sx={{ color: '#1a237e' }}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography sx={{ mx: 2, color: '#1a237e' }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                sx={{ color: '#1a237e' }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton 
                                            onClick={() => removeFromCart(item.id)}
                                            sx={{ 
                                                color: '#ef5350',
                                                '&:hover': {
                                                    color: '#d32f2f'
                                                }
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 3,
                        mb: 3
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                            Order Summary
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography>Subtotal:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right">₹{cartTotal.toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        bgcolor: '#1a237e',
                                        '&:hover': {
                                            bgcolor: '#0d47a1'
                                        }
                                    }}
                                    onClick={() => navigate('/order')}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* QR Code Payment Section */}
                    <Box sx={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        p: 3,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                            Scan & Pay
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center',
                            mb: 2 
                        }}>
                            <img 
                                src={qrimg}
                                alt="Payment QR Code"
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                        <Typography variant="subtitle1" sx={{ color: '#1a237e', fontWeight: '500' }}>
                            UPI ID: sujithrajar15@okaxis
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                            Scan to pay with any UPI app
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
