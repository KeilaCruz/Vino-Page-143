
import InfoFactores from '../components/InfoFactores.jsx'
import Procedimiento from '../components/Procedimiento.jsx'
import Carousel from '../components/Carousel.jsx'
import Beneficios from '../components/Beneficios.jsx'
function HomePage() {
    return (
        <>
            <Carousel />
            <Procedimiento />
            <InfoFactores />
            <div className="parallax-banner">
               <div className="parallax-overlay">
                  <h3 className="parallax-text">
                     Tradición y vanguardia en cada gota.
                  </h3>
               </div>
             </div> 
            <Beneficios />
        </>
    )
}

export default HomePage