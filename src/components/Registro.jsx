import { useState } from 'react'
import { registrarUsuario } from '../backend/services'
import { useNavigate } from 'react-router-dom'
function Registro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegistro = async (e) => {
        e.preventDefault();
        const { data, error } = await registrarUsuario(email, password);
        if (error) {
            console.error("Error al registrar usuario:", error.message);
            return;
        } else {
            console.log("Usuario registrado:", data);
            navigate("/login");
        }
    }
    return (
        <>
            <div className='registro__container'>
                <h2>Crear cuenta</h2>
                <form onSubmit={handleRegistro} className='registro__form'>
                    <label>Correo electrónico
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>Contraseña
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Registrar</button>
                </form>
            </div >
        </>
    )
}

export default Registro