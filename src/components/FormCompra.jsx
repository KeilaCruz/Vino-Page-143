import { useAuth } from "../Auth/AuthProvider"
const estadosMexico = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Estado de México",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas"
]

function FormCompra() {
    const { user } = useAuth();
    return (
        <>
            <form className="container__formCompra">
                <h3>Datos del envío</h3>
                <div className="grip__form">
                    <input style={{ gridColumn: "span 2" }} id='correo' type="email" placeholder="Correo electrónico" defaultValue={user?.email} />
                    <input styleid='nombre' type="text" placeholder="Nombre" />
                    <input id='apellido' type="text" placeholder="Apellidos" />
                    <input id='rfc' type="text" placeholder="RFC" />
                    <input type="text" placeholder="Empresa (opcional)" />
                    <input style={{ gridColumn: "span 2" }} id="direccion" type="text" placeholder="Calle, número y colonia" />
                    <input style={{ gridColumn: "span 2" }} id="info_adicional" type="text" placeholder="Casa, apartamento, etc. (opcional)" />
                    <input type="text" placeholder="Código Postal" />
                    <input id="ciudad" type="text" placeholder="Ciudad" />
                    <select>
                        <option value="" disabled selected>Selecciona su estado</option>
                        {estadosMexico.map((estado, index) => (
                            <option key={index} value={estado}>{estado}</option>
                        ))}
                    </select>
                    <input id='telefono' type="text" placeholder="Número telefónico" />
                </div>
                <h3>Datos de pago</h3>
                <div className="grip__form">
                    <input id='nombre_titular' type="text" placeholder="Nombre del titular" />
                    <input id='numero_tarjeta' type="text" placeholder="Número de tarjeta" />
                    <input id='fecha_vencimiento' type="text" placeholder="Fecha de vencimiento (MM/AA)" />
                    <input id='cvv' type="text" placeholder="CVV" />
                </div>
                <a>Pagar ahora</a>
            </form>
        </>
    )
}

export default FormCompra