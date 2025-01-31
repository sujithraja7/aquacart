import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Fish from './pages/Fish';
import Accessories from './pages/Accessories';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Orders from './pages/Orders';
import Auth from './pages/Auth';
import OrderConfirmation from './pages/OrderConfirmation';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};

function App() {
    const token = localStorage.getItem('token');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
                <Router>
                    <div className="App">
                        {token && <Navbar />}
                        <Routes>
                            {/* Public Routes */}
                            <Route 
                                path="/auth" 
                                element={token ? <Navigate to="/home" replace /> : <Auth />} 
                            />

                            {/* Protected Routes */}
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Navigate to="/home" replace />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/home"
                                element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/shop"
                                element={
                                    <ProtectedRoute>
                                        <Shop />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/fish"
                                element={
                                    <ProtectedRoute>
                                        <Fish />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/accessories"
                                element={
                                    <ProtectedRoute>
                                        <Accessories />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/cart"
                                element={
                                    <ProtectedRoute>
                                        <Cart />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/order"
                                element={
                                    <ProtectedRoute>
                                        <Order />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/orders"
                                element={
                                    <ProtectedRoute>
                                        <Orders />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/order-confirmation"
                                element={
                                    <ProtectedRoute>
                                        <OrderConfirmation />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Catch all route */}
                            <Route path="*" element={<Navigate to="/home" replace />} />
                        </Routes>
                    </div>
                </Router>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;
