import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const AddToCartButton = ({ item, type }) => {
    const { addToCart } = useCart();
    const [open, setOpen] = useState(false);

    const handleAddToCart = () => {
        // Normalize the type to match the schema requirements
        const normalizedType = type?.toLowerCase() === 'fish' ? 'pet' : 'accessory';
        
        // Ensure we have a valid ID
        const itemId = item._id || item.id;
        if (!itemId) {
            console.error('Invalid item ID:', item);
            return;
        }

        addToCart({
            id: itemId,
            type: normalizedType,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl || '',
        });
        setOpen(true);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                fullWidth
            >
                Add to Cart
            </Button>
            
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity="success"
                    variant="filled"
                >
                    Item added to cart!
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddToCartButton;
