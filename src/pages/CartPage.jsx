import React, { useState } from 'react';
import { useCart } from '../Auth/CartProvider';
import { useNavigate } from 'react-router-dom';


function CartPage() {
    const { cartItems, removeFromCart, updateItemQuantity, calculateTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null); // Estado para mensajes de la UI

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            setMessage("Tu carrito está vacío. Por favor, añade productos antes de proceder al pago.");
            return;
        }
        setMessage(null); // Limpia cualquier mensaje anterior
        navigate('/formCompra');
    };

    // Función para manejar la disminución de cantidad
    const handleDecreaseQuantity = (itemId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateItemQuantity(itemId, currentQuantity - 1);
        } else {
            // Opcional: si la cantidad es 1 y se intenta disminuir, podrías preguntar si desea eliminar
            // o simplemente no hacer nada. Aquí, lo dejaremos en 1.
            setMessage("La cantidad mínima es 1. Para eliminar el producto, usa el botón 'Eliminar'.");
        }
    };

    // Función para manejar el aumento de cantidad (con límite de stock si lo tuvieras en `item`)
    const handleIncreaseQuantity = (itemId, currentQuantity, maxQuantity) => {
        if (maxQuantity && currentQuantity >= maxQuantity) {
            setMessage(`No hay más stock disponible para ${cartItems.find(i => i.id === itemId)?.nombre || 'este producto'}.`);
            return;
        }
        updateItemQuantity(itemId, currentQuantity + 1);
        setMessage(null); // Limpia el mensaje si se aumenta correctamente
    };


    return (
        <div className="cart-page-container">
            <h1>Tu Carrito de Compras</h1>

            {/* Mensaje de alerta para el usuario */}
            {message && <div className="cart-message">{message}</div>}

            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Tu carrito está vacío. ¡Añade algunos productos!</p>
            ) : (
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td data-label="Producto">
                                    <div className="cart-item-details">
                                        {/* Imagen del producto */}
                                        <img
                                            src={item.imagen || 'https://placehold.co/80x80/cccccc/333333?text=Vino'}
                                            alt={item.nombre || 'Producto en carrito'}
                                            className="cart-item-image"
                                        />
                                        {/* Nombre del producto */}
                                        <div>{item.nombre}</div>
                                    </div>
                                </td>
                                <td data-label="Cantidad">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                            aria-label={`Disminuir cantidad de ${item.nombre}`}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncreaseQuantity(item.id, item.quantity, item.maxQuantity)} // Asumiendo que `item.maxQuantity` viene del stock
                                            aria-label={`Aumentar cantidad de ${item.nombre}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td data-label="Precio Unitario">${item.price ? Number(item.price).toFixed(2) : '0.00'}</td>
                                <td data-label="Subtotal">${(item.price && item.quantity) ? (Number(item.price) * Number(item.quantity)).toFixed(2) : '0.00'}</td>
                                <td data-label="Acciones">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="remove-item-button"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Sección del Total */}
            {cartItems.length > 0 && (
                <div className="total-section">
                    <h3>Total:</h3>
                    <span>${calculateTotal().toFixed(2)}</span>
                </div>
            )}

            {/* Botones de Acción Global */}
            <div className="checkout-buttons">
                <button
                    onClick={handleCheckout}
                    className="checkout-button"
                >
                    Proceder al Pago
                </button>
                <button
                    onClick={clearCart}
                    className="clear-cart-button"
                >
                    Vaciar Carrito
                </button>
            </div>
        </div>
    );
}

export default CartPage;