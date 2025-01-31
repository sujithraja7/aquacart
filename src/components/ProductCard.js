import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Rating,
    Chip,
} from '@mui/material';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({ product, type }) => {
    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.02)',
            },
        }}>
            <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
                sx={{ objectFit: 'contain', p: 2 }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.description}
                </Typography>
                {product.brand && (
                    <Chip 
                        label={product.brand} 
                        size="small" 
                        sx={{ mb: 1 }} 
                    />
                )}
                {product.category && (
                    <Chip 
                        label={product.category} 
                        size="small" 
                        color="primary" 
                        sx={{ ml: 1, mb: 1 }} 
                    />
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating || 4} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.reviews || 0} reviews)
                    </Typography>
                </Box>
                {product.stock !== undefined && (
                    <Typography 
                        variant="body2" 
                        color={product.stock > 0 ? "success.main" : "error.main"}
                    >
                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" color="primary">
                        ₹{product.price.toFixed(2)}
                    </Typography>
                    <AddToCartButton item={product} type={type} />
                </Box>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
