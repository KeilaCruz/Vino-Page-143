import CardCarousel from './CardCarousel';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import uvas_principal from '../assets/uvas_principal.jpg'
import fermentacion from '../assets/fermentacion.jpg'
import procedimiento from '../assets/procedimiento.jpg'

const items = [
    <CardCarousel title="Fermentación de la uva" description="Transformación biológica de los azúcares del jugo de uva en alcohol etílico, dióxido de carbono y calor, gracias a la acción de las levaduras." image={uvas_principal} />,
    <CardCarousel title="Duración" description="El proceso puede durar desde unos pocos días hasta varias semanas" image={procedimiento} />,
    <CardCarousel title="Aroma y sabor del vino" description="Durante la fermentación, los compuestos secundarios se liberan y contribuyen al perfil aromático y gustativo del vino." image={fermentacion} />,
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
                infinite
                items={items}
                className="carousel"
            />
        </>
    )
}

export default Carousel