import CardCarousel from './CardCarousel';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';

const items = [
    <CardCarousel title="Fermentación de la uva" description="Transformación del jugo en vino a través de levaduras naturales" image="https://imgs.search.brave.com/sjVDsN892HMWlxuapy1koljikYkUZ6RsgDXNyqPsroc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/dmFzby12aW5vLXRp/bnRvXzY1Nzg4My00/MjMuanBnP3NlbXQ9/YWlzX2h5YnJpZA" />,
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
                disableButtonsControls
                items={items}
                className="carousel"
            />
        </>
    )
}

export default Carousel