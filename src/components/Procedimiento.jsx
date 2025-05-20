
function Procedimiento() {

    return (
        <>
            <h1 className="procedimiento__title">Etapas del proceso</h1>

            <div className="procedimiento__container">
                <div className="procedimiento__card">
                    <h2>Preparación del mosto</h2>
                    <p>Las uvas se aplastan y se obtiene un jugo de uva, que es la base líquida para la fermentación</p>
                </div>
                <div className="procedimiento__card">
                    <h2>Iniciación de la fermentación</h2>
                    <p>Se añaden levaduras naturales o añadidas al mosto para comenzar a consumir los azúcares generando alcohol, dióxido de carbono y calor.</p>
                </div>
                <div className="procedimiento__card">
                    <h2>Fermentación primaria</h2>
                    <p>Durante esta etapa, las levaduras convierten el azúcar en alcohol, creando la mayor parte del sabor del vino</p>
                </div>
                <div className="procedimiento__card">
                    <h2>Fermentación secundaria</h2>
                    <p>Después de la fermentación primaria, el líquido se transfiere a otro recipiente con un airlock, que permite la salida de gases pero no la entrada de aire.</p>
                </div>
                <div className="procedimiento__card">
                    <h2>Envejecimiento</h2>
                    <p>El vino se guarda en barricas o botellas para madurar y desarrollar su sabor final</p>
                </div>
            </div>
        </>
    )
}

export default Procedimiento