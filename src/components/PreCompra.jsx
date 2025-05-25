import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVino } from '../backend/services';
import { useCart } from '../Auth/CartProvider';

function PreCompra() {
    const { idVino } = useParams();
    const [vino, setVino] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const quantityRef = useRef(null);

    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
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
        }
        fetchData();
    }, [idVino]);

    const handleAddToCart = () => {
        if (vino) {
            const quantity = parseInt(quantityRef.current.value, 10);
            if (isNaN(quantity) || quantity < 1) {
                alert("Por favor, introduce una cantidad válida (mínimo 1).");
                return;
            }

            const itemForCart = {
                id: vino.idVino,
                idVino: vino.idVino,
                nombre: vino.info_vino?.nombre || `Vino ID: ${vino.idVino}`,
                price: Number(vino.info_vino?.precio) || 0,
                quantity: quantity,
            };

            addToCart(itemForCart);
            navigate('/carrito');
        }
    };

    if (loading) {
        return (
            <div>
                <p>Cargando información del vino...</p>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!vino) {
        return <div>El vino solicitado no está disponible.</div>;
    }

    return (
        <div>
            <div>
                <div>
                    <img alt={vino.info_vino?.nombre} src={vino.info_vino?.imagen || 'https://placehold.co/400x600/cccccc/333333?text=Vino+No+Disponible'} />
                </div>
                <div>
                    <h2>{vino.info_vino?.nombre}</h2>
                    <p>$ {vino.info_vino?.precio}</p>
                    <p>Mililitros: {vino.info_vino?.mililitros}ml</p>
                    <p>Cantidad disponible: {vino.cantidad}</p>

                    <div>
                        <label htmlFor="quantity">Cantidad:</label>
                        <input
                            type='number'
                            id="quantity"
                            ref={quantityRef}
                            placeholder='Cantidad'
                            min="1"
                            max={vino.cantidad || 1000000}
                            defaultValue="1"
                        />
                    </div>

                    <div>
                        <button onClick={handleAddToCart}>Agregar carrito</button>
                        <a href='/formCompra'>Comprar ahora</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreCompra;