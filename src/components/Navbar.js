import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Menu,
    MenuItem,
    Avatar,
    Divider,
    ListItemIcon,
} from '@mui/material';
import CartIcon from './CartIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Don't show navbar on auth page
    if (location.pathname === '/auth') {
        return null;
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        handleClose();
        navigate('/auth');
    };

    const handleViewOrders = () => {
        handleClose();
        navigate('/orders');
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/home"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        '&:hover': {
                            opacity: 0.8
                        }
                    }}
                >
                    🐠 Aqua Cart
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/home"
                        sx={{ mx: 1 }}
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/shop"
                        sx={{ mx: 1 }}
                    >
                        Shop
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/fish"
                        sx={{ mx: 1 }}
                    >
                        Fish
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/accessories"
                        sx={{ mx: 1 }}
                    >
                        Accessories
                    </Button>

                    <CartIcon />

                    {user && (
                        <>
                            <IconButton
                                color="inherit"
                                onClick={handleMenu}
                                sx={{ ml: 1 }}
                            >
                                {user.avatar ? (
                                    <Avatar
                                        src={user.avatar}
                                        alt={user.username}
                                        sx={{ width: 32, height: 32 }}
                                    />
                                ) : (
                                    <AccountCircleIcon />
                                )}
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                onClick={handleClose}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleViewOrders}>
                                    <ListItemIcon>
                                        <ShoppingBagIcon fontSize="small" />
                                    </ListItemIcon>
                                    My Orders
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    onClick={handleLogout}
                                    sx={{
                                        color: 'error.main',
                                        '& .MuiSvgIcon-root': { mr: 1 },
                                    }}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
