import React from 'react'

function CardCarousel({ title, description, image }) {
    return (
        <>
            <div className='card'>
                <div className='container-image'>
                    <img src={image} />
                </div>
                <div className='card-info'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <a href="#">Ver más</a>
                </div>
            </div>
        </>
    )
}
export default CardCarousel