import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        // Ensure item has the correct type field
        const normalizedItem = {
            ...item,
            type: item.type?.toLowerCase() === 'fish' ? 'pet' : 'accessory'
        };

        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => 
                cartItem.id === normalizedItem.id && cartItem.type === normalizedItem.type
            );

            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === normalizedItem.id && cartItem.type === normalizedItem.type
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }

            return [...prevCart, { ...normalizedItem, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
