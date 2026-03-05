import React from 'react'
import longevidad from '../assets/longevidad.png'
import vitamina_e from '../assets/vitamina_e.png'
import corazon from '../assets/corazon.png'
import cerebro from '../assets/cerebro.png'
function Beneficios() {
    return (
        <>
        <section className='seccion-crema'>
           <h1 className="beneficios__title">Beneficios</h1>
            <div className="beneficios__container">
                <div className="beneficios__card">
                    <img src={longevidad} alt="Longevidad" />
                    <h2>Rico en antioxidantes</h2>
                    <p>El vino,contiene polifenoles que ayudan a combatir el daño de los radicales libres en el cuerpo y previenen el envejecimiento celular</p>
                </div>
                <div className="beneficios__card">
                    <img src={corazon} alt="Corazón" />
                    <h2>Salud cardiovascular</h2>
                    <p>El consumo moderado de vino puede mejorar la salud de los vasos sanguíneos y reducir el riesgo de enfermedades cardíacas.</p>
                </div>
                <div className="beneficios__card">
                    <img src={vitamina_e} alt="Vitamina E" />
                    <h2>Potencial para la Longevidad</h2>
                    <p>Compuestos como el resveratrol en el vino se asocian con la activación de proteínas vinculadas a una mayor esperanza de vida.</p>
                </div>
                <div className="beneficios__card">
                    <img src={cerebro} alt="Cerebro" />
                    <h2>Bienestar mental</h2>
                    <p>El consumo moderado puede estar relacionado con un menor riesgo de depresión y fomenta la relajación y conexión social, mejorando el bienestar general.</p>
                </div>
            </div>
        </section>    
        </>
    )
}

export default Beneficios