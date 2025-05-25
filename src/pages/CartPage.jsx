import React from 'react'
import { useCart } from '../Auth/CartProvider'
import { useNavigate } from 'react-router-dom';
function CartPage() {
    const { cartItems, removeFromCart, updateItemQuantity, calculateTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Tu carrito está vacío. Por favor, añade productos antes de proceder al pago.");
            return;
        }
        navigate('/formCompra');
    };
    return (
        <div>
            <h1>Tu Carrito de Compras</h1>

            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío. ¡Añade algunos productos!</p>
            ) : (
                <table>
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
                                <td>
                                    <div>{item.name}</div>
                                </td>
                                <td>
                                    <div>
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>${item.price ? Number(item.price).toFixed(2) : 'N/A'}</td>
                                <td>${(item.price && item.quantity) ? (Number(item.price) * Number(item.quantity)).toFixed(2) : 'N/A'}</td>
                                <td>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div>
                <h3>Total:</h3>
                <span>${calculateTotal().toFixed(2)}</span>
            </div>

            <div>
                <button
                    onClick={handleCheckout}
                >
                    Proceder al Pago
                </button>
                <button
                    onClick={clearCart}
                >
                    Vaciar Carrito
                </button>
            </div>
        </div>
    );
}
export default CartPage