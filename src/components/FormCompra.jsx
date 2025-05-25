import { useState, useEffect, useRef } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useCart } from "../Auth/CartProvider";
import { insertVenta } from "../backend/services";

const estadosMexico = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
    "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México",
    "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos",
    "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí",
    "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

// Datos Fijos de la Empresa (Cosecha Joven)
const COMPANY_DETAILS = {
    name: "Cosecha Joven S.A. de C.V.",
    rfc: "COJ210915XY1",
    address: "Hidalgo, Coatzacoalcos Centro, Coatzacoalcos",
    slogan: "Vinos Naturales de Uva Morada",
    // Puedes añadir más detalles si lo necesitas
};

const IVA_RATE = 0.16; // 16% de IVA en México

function FormCompra() {
    const { user } = useAuth();
    const { cartItems, clearCart } = useCart();

    const [formData, setFormData] = useState({
        correo: user?.email || "",
        nombre: "",
        apellido: "",
        rfc: "",
        empresa: "",
        direccion: "",
        info_adicional: "",
        codigo_postal: "",
        ciudad: "",
        estado: "",
        telefono: "",
        nombre_titular: "",
        numero_tarjeta: "",
        fecha_vencimiento: "",
        cvv: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [ventaRealizada, setVentaRealizada] = useState(null);
    const [detallesVentaParaFactura, setDetallesVentaParaFactura] = useState([]);
    const invoiceContentRef = useRef(null);

    useEffect(() => {
        if (user?.email && formData.correo !== user.email) {
            setFormData(prevData => ({ ...prevData, correo: user.email }));
        }
    }, [user, formData.correo]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Debes estar autenticado para realizar una compra");
            return;
        }
        if (cartItems.length === 0) {
            alert("No hay productos en el carrito");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);
        setVentaRealizada(null);
        setDetallesVentaParaFactura([]);

        try {
            const detallesParaDB = cartItems.map(item => ({
                nombre: item.nombre,
                cantidad: item.quantity,
                subtotal: (Number(item.price) || 0) * (Number(item.quantity) || 0),
                precioUnitario: (Number(item.price) || 0), // Añadir precio unitario para la factura
                idVino: item.idVino
            }));

            const subtotalSinIVA = detallesParaDB.reduce((acc, detail) => acc + detail.subtotal, 0);
            const ivaCalculado = subtotalSinIVA * IVA_RATE;
            const totalConIVA = subtotalSinIVA + ivaCalculado;


            console.log("Datos a enviar a insertVenta:", {
                p_id_cliente: user.id,
                p_nombre: `${formData.nombre} ${formData.apellido}`,
                p_rfc: formData.rfc,
                p_nombre_empresa: formData.empresa,
                p_direccion: formData.direccion,
                p_apartamento: formData.info_adicional,
                p_codigo_postal: formData.codigo_postal,
                p_ciudad: formData.ciudad,
                p_estado: formData.estado,
                p_numero_tarjeta: formData.numero_tarjeta,
                p_total: totalConIVA, // Pasar el total con IVA a la DB
                p_detalles: detallesParaDB
            });


            const { data, error: apiError } = await insertVenta(
                user.id,
                `${formData.nombre} ${formData.apellido}`,
                formData.rfc,
                formData.empresa,
                formData.direccion,
                formData.info_adicional,
                formData.codigo_postal,
                formData.ciudad,
                formData.estado,
                formData.numero_tarjeta,
                totalConIVA, // Usar el total con IVA
                detallesParaDB
            );

            console.log("Resultado de insertVenta (data, apiError):", { data, apiError });

            if (apiError) {
                console.error("Error al insertar la venta:", apiError);
                setError(`Error al procesar la compra: ${apiError.message}`);
            } else {
                setSuccess(true);
                // Asegúrate de que 'data' contenga idVenta y created_at
                setVentaRealizada(data);
                setDetallesVentaParaFactura(detallesParaDB);
                console.log("Venta realizada con éxito. Datos de la venta:", data);
                clearCart();
            }
        } catch (err) {
            console.error("Excepción al llamar a insert_venta:", err);
            setError("Ocurrió un error inesperado al procesar la compra.");
        } finally {
            setLoading(false);
            console.log("Estado final después del envío:", { success, ventaRealizada, loading, error });
        }
    };

    const handleGenerateInvoice = async () => {
        if (!ventaRealizada || !detallesVentaParaFactura.length || !invoiceContentRef.current) {
            setError("No hay datos de venta para generar la factura o el contenido no está listo.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { default: html2canvas } = await import('html2canvas');
            const { jsPDF } = await import('jspdf');

            const input = invoiceContentRef.current;
            const canvas = await html2canvas(input, { scale: 2 });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`factura_${ventaRealizada.idVenta}.pdf`);
        } catch (err) {
            console.error("Error al generar el PDF:", err);
            setError("Ocurrió un error al generar la factura.");
        } finally {
            setLoading(false);
        }
    };

    const isSubmitDisabled = loading || cartItems.length === 0;

    // Calcular totales para la factura
    const subtotalParaFactura = detallesVentaParaFactura.reduce((acc, item) => acc + item.subtotal, 0);
    const ivaParaFactura = subtotalParaFactura * IVA_RATE;
    const totalParaFactura = subtotalParaFactura + ivaParaFactura;

    // Función para convertir número a letras (placeholder, puedes buscar una librería o implementar una más robusta)
    const numeroALetras = (numero) => {
        if (isNaN(numero)) return "";
        const units = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
        const teens = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
        const tens = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
        const hundreds = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

        if (numero === 0) return "Cero";
        if (numero < 10) return units[numero];
        if (numero < 20) return teens[numero - 10];
        if (numero < 100) {
            let numStr = String(numero);
            let result = tens[parseInt(numStr[0])];
            if (numStr[1] !== '0') result += " y " + units[parseInt(numStr[1])];
            return result;
        }
        if (numero < 1000) {
            let numStr = String(numero);
            let result = hundreds[parseInt(numStr[0])];
            if (numStr.substring(1) !== '00') result += " " + numeroALetras(parseInt(numStr.substring(1)));
            return result;
        }
        // Para números más grandes, necesitarías una librería o una implementación más compleja.
        // Esto es solo un ejemplo muy básico.
        return numero.toFixed(2); // Retornar el número si es demasiado grande para esta función simple
    };

    const cantidadConLetra = `${numeroALetras(Math.floor(totalParaFactura))} pesos ${((totalParaFactura % 1) * 100).toFixed(0)}/100 M.N.`;


    return (
        <>
            <form className="container__formCompra" onSubmit={handleSubmit}>
                <h3>Datos del envío</h3>
                <div className="grip__form">
                    <input
                        style={{ gridColumn: "span 2" }}
                        id='correo'
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.correo}
                        onChange={handleInputChange}
                        readOnly={!!user?.email}
                        required
                    />
                    <input id='nombre' type="text" placeholder="Nombre" value={formData.nombre} onChange={handleInputChange} required />
                    <input id='apellido' type="text" placeholder="Apellidos" value={formData.apellido} onChange={handleInputChange} required />
                    <input id='rfc' type="text" placeholder="RFC" value={formData.rfc} onChange={handleInputChange} />
                    <input id='empresa' type="text" placeholder="Empresa (opcional)" value={formData.empresa} onChange={handleInputChange} />
                    <input style={{ gridColumn: "span 2" }} id="direccion" type="text" placeholder="Calle, número y colonia" value={formData.direccion} onChange={handleInputChange} required />
                    <input style={{ gridColumn: "span 2" }} id="info_adicional" type="text" placeholder="Casa, apartamento, etc. (opcional)" value={formData.info_adicional} onChange={handleInputChange} />
                    <input id='codigo_postal' type="text" placeholder="Código Postal" value={formData.codigo_postal} onChange={handleInputChange} required />
                    <input id="ciudad" type="text" placeholder="Ciudad" value={formData.ciudad} onChange={handleInputChange} required />
                    <select id="estado" value={formData.estado} onChange={handleInputChange} required>
                        <option value="" disabled>Selecciona su estado</option>
                        {estadosMexico.map((estado, index) => (
                            <option key={index} value={estado}>{estado}</option>
                        ))}
                    </select>
                    <input id='telefono' type="text" placeholder="Número telefónico" value={formData.telefono} onChange={handleInputChange} />
                </div>
                <h3>Datos de pago</h3>
                <div className="grip__form">
                    <input id='nombre_titular' type="text" placeholder="Nombre del titular" value={formData.nombre_titular} onChange={handleInputChange} required />
                    <input id='numero_tarjeta' type="text" placeholder="Número de tarjeta" value={formData.numero_tarjeta} onChange={handleInputChange} required />
                    <input id='fecha_vencimiento' type="text" placeholder="Fecha de vencimiento (MM/AA)" value={formData.fecha_vencimiento} onChange={handleInputChange} required />
                    <input id='cvv' type="text" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>¡Compra realizada con éxito!</p>}

                <button type="submit" disabled={isSubmitDisabled} className="btn__comprar">
                    {loading ? 'Procesando...' : (cartItems.length === 0 ? 'Carrito Vacío' : 'Pagar ahora')}
                </button>

                {success && ventaRealizada && (
                    <button onClick={handleGenerateInvoice} disabled={loading} className="btn__facturar">
                        {loading ? 'Generando PDF...' : 'Generar Factura'}
                    </button>
                )}
            </form>

            {/* Contenido de la factura oculto para html2canvas */}
            {success && ventaRealizada && (
                <div ref={invoiceContentRef} style={{
                    position: 'absolute',
                    left: '-9999px',
                    top: '-9999px',
                    width: '210mm', // A4 width
                    minHeight: '297mm', // A4 height
                    padding: '20mm',
                    backgroundColor: '#fff',
                    color: '#333',
                    boxSizing: 'border-box',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '10pt',
                    lineHeight: '1.4',
                    border: '1px solid #ddd'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '25px', borderBottom: '2px solid #6a0dad', paddingBottom: '10px' }}>
                        <h1 style={{ margin: '0', fontSize: '24pt', color: '#6a0dad' }}>Cosecha Joven</h1>
                        <p style={{ margin: '5px 0 0', fontSize: '12pt', color: '#555' }}>{COMPANY_DETAILS.slogan}</p>
                    </div>

                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '48%' }}>
                            <h2 style={{ fontSize: '14pt', marginBottom: '10px', color: '#6a0dad' }}>Razón Social: {COMPANY_DETAILS.name}</h2>
                            <p style={{ margin: '0 0 5px 0' }}><strong>RFC:</strong> {COMPANY_DETAILS.rfc}</p>
                            <p style={{ margin: '0' }}><strong>Domicilio Oficial:</strong> {COMPANY_DETAILS.address}</p>
                        </div>
                        <div style={{ width: '48%', textAlign: 'right' }}>
                            <p style={{ margin: '0 0 5px 0' }}><strong>Factura No.:</strong> CJ-001257</p>
                            <p style={{ margin: '0' }}><strong>Fecha de Emisión:</strong> {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            {/* Puedes usar ventaRealizada.created_at si quieres la fecha de la venta */}
                            {/* <p style={{ margin: '0' }}><strong>Fecha de Emisión:</strong> {new Date(ventaRealizada.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p> */}
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '25px 0' }} />

                    <h2 style={{ fontSize: '14pt', marginBottom: '10px', color: '#6a0dad' }}>Datos del Cliente</h2>
                    <div style={{ marginBottom: '25px' }}>
                        <p style={{ margin: '0 0 5px 0' }}><strong>Nombre:</strong> {formData.nombre} {formData.apellido}</p>
                        <p style={{ margin: '0 0 5px 0' }}><strong>RFC:</strong> {formData.rfc || 'N/A'}</p>
                        <p style={{ margin: '0' }}><strong>Domicilio:</strong> {formData.direccion}, {formData.info_adicional ? `${formData.info_adicional}, ` : ''}{formData.ciudad}, {formData.estado}, CP: {formData.codigo_postal}</p>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '25px 0' }} />

                    <h2 style={{ fontSize: '14pt', marginBottom: '15px', color: '#6a0dad' }}>Concepto de Venta</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0e6fa', borderBottom: '2px solid #6a0dad' }}>
                                <th style={{ textAlign: 'center', padding: '10px', borderRight: '1px solid #ddd' }}>Cantidad</th>
                                <th style={{ textAlign: 'left', padding: '10px', borderRight: '1px solid #ddd' }}>Descripción</th>
                                <th style={{ textAlign: 'right', padding: '10px', borderRight: '1px solid #ddd' }}>Precio Unitario</th>
                                <th style={{ textAlign: 'right', padding: '10px' }}>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detallesVentaParaFactura.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ textAlign: 'center', padding: '8px', borderRight: '1px solid #f0f0f0' }}>{item.cantidad}</td>
                                    <td style={{ textAlign: 'left', padding: '8px', borderRight: '1px solid #f0f0f0' }}>{item.nombre}</td>
                                    <td style={{ textAlign: 'right', padding: '8px', borderRight: '1px solid #f0f0f0' }}>$ {item.precioUnitario.toFixed(2)} MXN</td>
                                    <td style={{ textAlign: 'right', padding: '8px' }}>$ {item.subtotal.toFixed(2)} MXN</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <div style={{ width: '40%', minWidth: '200px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
                                <tbody>
                                    <tr style={{ borderBottom: '1px dashed #ccc' }}>
                                        <td style={{ padding: '5px', textAlign: 'left' }}><strong>Subtotal:</strong></td>
                                        <td style={{ padding: '5px', textAlign: 'right' }}>$ {subtotalParaFactura.toFixed(2)} MXN</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px dashed #ccc' }}>
                                        <td style={{ padding: '5px', textAlign: 'left' }}><strong>IVA ({IVA_RATE * 100}%):</strong></td>
                                        <td style={{ padding: '5px', textAlign: 'right' }}>$ {ivaParaFactura.toFixed(2)} MXN</td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#e0c9f7', borderTop: '2px solid #6a0dad', fontWeight: 'bold' }}>
                                        <td style={{ padding: '10px', textAlign: 'left', fontSize: '14pt', color: '#6a0dad' }}>Total:</td>
                                        <td style={{ padding: '10px', textAlign: 'right', fontSize: '14pt', color: '#6a0dad' }}>$ {totalParaFactura.toFixed(2)} MXN</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p style={{ textAlign: 'left', fontSize: '10pt', fontStyle: 'italic', color: '#555' }}>
                                **Cantidad con Letra:** {cantidadConLetra}
                            </p>
                        </div>
                    </div>

                    <p style={{ marginTop: '40px', fontSize: '0.9em', textAlign: 'center', color: '#777', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                        Cosecha Joven - ¡Vinos de Calidad para Momentos Inolvidables!
                    </p>
                </div>
            )}
        </>
    );
}

export default FormCompra;