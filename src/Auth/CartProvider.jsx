import { useState, useEffect, createContext, useContext } from "react";

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
};

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCartItems = localStorage.getItem("cartItems");
            if (storedCartItems) {
                return JSON.parse(storedCartItems);
            }
        } catch (error) {
            localStorage.removeItem("cartItems");
        }
        return [];
    });

    useEffect(() => {
        try {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } catch (error) {
        }
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
                );
            } else {
                return [...prevItems, item];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const updateItemQuantity = (itemId, quantity) => {
        setCartItems((prevItems) => {
            if (quantity <= 0) {
                return prevItems.filter((item) => item.id !== itemId);
            }
            return prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item));
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
    };

    const CartContextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        calculateTotal
    };

    return (
        <CartContext.Provider value={CartContextValue}>
            {children}
        </CartContext.Provider>
    );
}