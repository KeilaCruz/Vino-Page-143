import temperatura_agua from '../assets/temperatura_agua.png';
import o2 from '../assets/o2.png';
import levadura from '../assets/levadura.png';
import tiempo from '../assets/tiempo.png';
function InfoFactores() {
    return (
        <>
            <h1 className="factores__title">Factores claves</h1>
            <div className="factores__container">
                <div className="factores__card">
                    <img src={temperatura_agua} alt="Temperatura del agua" />
                    <h2>Temperatura</h2>
                    <p>La fermentación se realiza mejor entre 15° y 21°C</p>
                </div>
                <div className="factores__card">
                    <img src={o2} alt="Oxígeno" />
                    <h2>Oxígeno</h2>
                    <p>Evitar el contacto con el oxígeno durante el proceso para prevenir la oxidación</p>
                </div>
                <div className="factores__card">
                    <img src={levadura} alt="Levaduras" />
                    <h2>Levaduras</h2>
                    <p>Son esenciales para la fermentación,pueden ser naturales o añadidas</p>
                </div>
                <div className="factores__card">
                    <img src={tiempo} alt="Duración" />
                    <h2>Duración</h2>
                    <p>Puede durar entre 5 y 21 días, dependiendo del volumen del mosto</p>
                </div>
            </div>
        </>
    )
}

export default InfoFactores