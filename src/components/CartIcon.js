import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, IconButton } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
    const navigate = useNavigate();
    const { cart, getCartCount } = useCart();

    const totalItems = getCartCount();

    return (
        <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{ ml: 2 }}
        >
            <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    );
};

export default CartIcon;
