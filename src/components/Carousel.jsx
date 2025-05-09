import React from 'react'
import CardCarousel from './CardCarousel';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';

const items = [
    <CardCarousel title="Imagen 1" description="Descripción de la imagen 1" image="https://imgs.search.brave.com/sjVDsN892HMWlxuapy1koljikYkUZ6RsgDXNyqPsroc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/dmFzby12aW5vLXRp/bnRvXzY1Nzg4My00/MjMuanBnP3NlbXQ9/YWlzX2h5YnJpZA" />,
    <CardCarousel title="Imagen 2" description="Descripción de la imagen 2" image="https://imgs.search.brave.com/sjVDsN892HMWlxuapy1koljikYkUZ6RsgDXNyqPsroc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/dmFzby12aW5vLXRp/bnRvXzY1Nzg4My00/MjMuanBnP3NlbXQ9/YWlzX2h5YnJpZA" />,
    <CardCarousel title="Imagen 3" description="Descripción de la imagen 3" image="https://imgs.search.brave.com/sjVDsN892HMWlxuapy1koljikYkUZ6RsgDXNyqPsroc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/dmFzby12aW5vLXRp/bnRvXzY1Nzg4My00/MjMuanBnP3NlbXQ9/YWlzX2h5YnJpZA" />,
    <CardCarousel title="Imagen 4" description="Descripción de la imagen 4" image="https://imgs.search.brave.com/sjVDsN892HMWlxuapy1koljikYkUZ6RsgDXNyqPsroc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/dmFzby12aW5vLXRp/bnRvXzY1Nzg4My00/MjMuanBnP3NlbXQ9/YWlzX2h5YnJpZA" />,
    <CardCarousel title="Imagen 5" description="Descripción de la imagen 5" image="https://imgs.search.brave.com/sjVDsN892HMWlxuapy1koljikYkUZ6RsgDXNyqPsroc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/dmFzby12aW5vLXRp/bnRvXzY1Nzg4My00/MjMuanBnP3NlbXQ9/YWlzX2h5YnJpZA" />,
]
function Carousel() {
    return (
        <>
            <AliceCarousel
                autoPlay
                autoPlayStrategy="none"
                autoPlayInterval={4000}
                animationDuration={1000}
                animationType="slide"
                infinite
                disableButtonsControls
                items={items}
                className="carousel"
            />
        </>
    )
}

export default Carousel