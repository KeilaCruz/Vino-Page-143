import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVino } from '../backend/services';
import { useCart } from '../Auth/CartProvider';

function PreCompra() {
    const { idVino } = useParams();
    const [vino, setVino] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const quantityRef = useRef(null);

    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                setMessage(null); // Limpia cualquier mensaje anterior al cargar
                const data = await getVino(idVino);
                if (data && data.length > 0) {
                    setVino(data[0]);
                } else {
                    setVino(null);
                    setError(new Error("No se encontró el vino con este ID."));
                }
            } catch (err) {
                console.error("Error al obtener datos:", err);
                setError(new Error("Hubo un problema al cargar la información del vino."));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [idVino]);

    const handleAddToCart = () => {
        if (vino) {
            const quantity = parseInt(quantityRef.current.value, 10);

            if (isNaN(quantity) || quantity < 1) {
                setMessage("Por favor, introduce una cantidad válida (mínimo 1).");
                return;
            }
            if (quantity > vino.cantidad) {
                setMessage(`Solo hay ${vino.cantidad} unidades disponibles.`);
                return;
            }

            const itemForCart = {
                id: vino.idVino,
                nombre: vino.info_vino?.nombre || `Vino ID: ${vino.idVino}`,
                price: Number(vino.info_vino?.precio) || 0,
                quantity: quantity,
                imagen: vino.info_vino?.imagen || 'https://placehold.co/400x600/cccccc/333333?text=Vino+No+Disponible'
            };

            addToCart(itemForCart);
            setMessage("Producto agregado al carrito con éxito.");
            setTimeout(() => {
                navigate('/carrito');
            }, 1000);
        }
    };

    if (loading) {
        return (
            <div className="precompra-status">
                <p>Cargando información del vino...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="precompra-status precompra-status--error">
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (!vino) {
        return (
            <div className="precompra-status">
                <p>El vino solicitado no está disponible.</p>
            </div>
        );
    }

    return (
        <div className='precompra'>


            <img
                alt={vino.info_vino?.nombre || 'Imagen de vino'}
                src={vino.info_vino?.imagen || 'https://placehold.co/400x600/cccccc/333333?text=Vino+No+Disponible'}
            />

            <div className='precompra__info'>
                <h2>{vino.info_vino?.nombre}</h2>
                <p className="precompra__price">$ {vino.info_vino?.precio}</p>
                <p>Mililitros: {vino.info_vino?.mililitros}ml</p>

                {message && <div className="precompra__message">{message}</div>}

                <div className="quantity-control">
                    <label htmlFor="quantity">Cantidad:</label>
                    <input
                        type='number'
                        id="quantity"
                        ref={quantityRef}
                        placeholder='1'
                        min="1"
                        max={vino.cantidad || 1000000}
                        defaultValue="1"
                    />
                </div>

                <div className="action-buttons">
                    <button onClick={handleAddToCart}>Agregar carrito</button>
                    <a href='/formCompra'>Comprar ahora</a>
                </div>
            </div>
        </div>
    );
}

export default PreCompra;