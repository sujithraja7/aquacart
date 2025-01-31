import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Tabs,
    Tab,
    Alert,
    CircularProgress
} from '@mui/material';
import { authService } from '../services/api';

const Auth = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setError('');
        setSuccess('');
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        });
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Please fill in all required fields');
            return false;
        }
        if (tab === 1) {
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
            if (!formData.username) {
                setError('Username is required');
                return false;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            if (tab === 0) {
                // Login
                const { email, password } = formData;
                const response = await authService.login({ email, password });
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    setSuccess('Login successful! Redirecting...');
                    // Redirect immediately to shop page
                    navigate('/shop');
                } else {
                    throw new Error('Login failed - no token received');
                }
            } else {
                // Register
                const { email, password, username } = formData;
                const response = await authService.register({ email, password, username });
                if (response.token) {
                    setSuccess('Registration successful! You can now log in.');
                    setTimeout(() => setTab(0), 1500);
                } else {
                    throw new Error('Registration failed - please try again');
                }
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    🐠 Aqua Cart
                </Typography>
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={tab} onChange={handleTabChange} centered>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </Box>

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
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        autoComplete="email"
                    />

                    {tab === 1 && (
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            margin="normal"
                            required
                            autoComplete="username"
                        />
                    )}

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        autoComplete={tab === 0 ? "current-password" : "new-password"}
                    />

                    {tab === 1 && (
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            margin="normal"
                            required
                            autoComplete="new-password"
                        />
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : tab === 0 ? (
                            'Login'
                        ) : (
                            'Register'
                        )}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
