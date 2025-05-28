import preparar_mosto from '../assets/preparar_mosto.jpg';
import inicio_fermentacion from '../assets/inicio_fermentacion.jpg';
import vino_sabor_carousel from '../assets/vino_sabor_carousel.jpg';
import fermentacion from '../assets/fermentacion.jpg';
import botellas from '../assets/botellas.jpg';
function Procedimiento() {

    return (
        <>
            <h1 className="procedimiento__title">Etapas del proceso</h1>

            <div className="procedimiento__container">
                <div className="procedimiento__card">
                    <div className='card_image_wrapper'>
                        <img src={preparar_mosto}
                            alt="Preparación del mosto" />
                    </div>
                    <div className='card_text_content'>
                        <h2>Preparación del mosto</h2>
                        <p>Las uvas se aplastan y se obtiene un jugo de uva, que es la base líquida para la fermentación</p>
                    </div>
                </div>

                <div className="procedimiento__card">
                    <div className='card_image_wrapper'>
                        <img src={inicio_fermentacion}
                            alt="Iniciación de la fermentación" />
                    </div>
                    <div className='card_text_content'>
                        <h2>Iniciación de la fermentación</h2>
                        <p>Se añaden levaduras naturales o añadidas al mosto para comenzar a consumir los azúcares generando alcohol, dióxido de carbono y calor.</p>
                    </div>
                </div>
                <div className="procedimiento__card">
                    <div className='card_image_wrapper'>
                        <img src={vino_sabor_carousel}
                            alt="Fermentación primaria" />
                    </div>
                    <div className='card_text_content'>
                        <h2>Fermentación primaria</h2>
                        <p>Durante esta etapa, las levaduras convierten el azúcar en alcohol, creando la mayor parte del sabor del vino</p>
                    </div>
                </div>
                <div className="procedimiento__card">
                    <div className='card_image_wrapper'>
                        <img src={fermentacion}
                            alt="Fermentación secundaria" />
                    </div>
                    <div className='card_text_content'>
                        <h2>Fermentación secundaria</h2>
                        <p>Después de la fermentación primaria, el líquido se transfiere a otro recipiente con un airlock, que permite la salida de gases pero no la entrada de aire.</p>
                    </div>
                </div>
                <div className="procedimiento__card">
                    <div className='card_image_wrapper'>
                        <img src={botellas}
                            alt="Envejecimiento" />
                    </div>
                    <div className='card_text_content'>
                        <h2>Envejecimiento</h2>
                        <p>El vino se guarda en barricas o botellas para madurar y desarrollar su sabor final</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Procedimiento