import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { getVino } from '../backend/services'
function PreCompra() {
    const { idVino } = useParams()
    const [vino, setVino] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getVino(idVino);
                if (data && data.length > 0) {
                    setVino(data[0]);
                } else {
                    setVino(null);
                }
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [idVino])
    return (
        <>
            {loading ? (
                <>
                    <div className="loading-center-container">
                        <p>Cosecha joven</p>
                        <div className="lds-ring">
                            <div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                </>
            ) : (
                <div className='precompra'>
                    <img alt={vino.info_vino?.nombre} src='https://static.rfstat.com/mockup-maker/mockups/3153/9cca8231a4253f30be50fa957bd737d5.webp' />
                    <div className='precompra__info'>
                        <h2>{vino.info_vino?.nombre}</h2>
                        <p>$ {vino.info_vino?.precio}</p>
                        <input type='number' placeholder='Cantidad' min="1" max="1000000" defaultValue="1" />
                        <button>Agregar carrito</button>
                        <a href='/formCompra'>Comprar ahora</a>
                    </div>
                </div>
            )}
        </>
    )
}

export default PreCompra