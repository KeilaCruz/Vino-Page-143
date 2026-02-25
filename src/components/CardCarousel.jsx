import React from 'react'

function CardCarousel({ title, description, image }) {
    return (
        <>
            <div className='card'>
                <div className='container-image'>
                    <img src={image} />
                </div>
                <div className='card-info'>
                    <span className='card_title'>{title}</span>
                    <p>{description}</p>
                </div>
            </div>
        </>
    )
}
export default CardCarousel