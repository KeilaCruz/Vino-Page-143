import React from 'react'
import { useCart } from '../Auth/CartProvider'

function CartPage() {
    const { cartItems, removeFromCart, updateItemQuantity, calculateTotal, clearCart } = useCart();

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
                                {/* MUY IMPORTANTE: Antes de llamar a toFixed, verifica que item.price exista y conviértelo a número */}
                                <td>${item.price ? Number(item.price).toFixed(2) : 'N/A'}</td>
                                {/* MUY IMPORTANTE: Antes de multiplicar, verifica que item.price y item.quantity existan y sean números */}
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
                    onClick={() => alert('¡Procediendo al pago!')}
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