
function InfoFactores() {
    return (
        <>
            <h1 className="factores__title">Factores claves</h1>

            <div className="factores__container">
                <div className="factores__card">
                    <h2>Temperatura</h2>
                    <p>La fermentación se realiza mejor entre 15° y 21°C</p>
                </div>
                <div className="factores__card">
                    <h2>Oxígeno</h2>
                    <p>Evitar el contacto con el oxígeno durante el proceso para prevenir la oxidación</p>
                </div>
                <div className="factores__card">
                    <h2>Levaduras</h2>
                    <p>Son esenciales para la fermentación,pueden ser naturales o añadidas</p>
                </div>
                <div className="factores__card">
                    <h2>Duración</h2>
                    <p>Puede durar entre 5 y 21 días, dependiendo del volumen del mosto</p>
                </div>
            </div>
        </>
    )
}

export default InfoFactores