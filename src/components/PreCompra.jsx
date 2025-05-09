import React from 'react'

function PreCompra({ nombreproducto, precio }) {
    return (
        <>
            <div className='precompra'>
                <img alt={nombreproducto} src='https://static.rfstat.com/mockup-maker/mockups/3153/9cca8231a4253f30be50fa957bd737d5.webp' />
                <div className='precompra__info'>
                    <h2>{nombreproducto}</h2>
                    <p>$ {precio}</p>
                    <input type='number' placeholder='Cantidad' min="1" max="1000000" defaultValue="1"/>
                    <button>Agregar carrito</button>
                    <a href='/detalle-compra'>Realizar compra</a>
                </div>
            </div>
        </>
    )
}

export default PreCompra