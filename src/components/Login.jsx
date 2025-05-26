import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUsuario } from '../backend/services'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        const { data, error } = await loginUsuario(email, password)
        if (error) {
            console.error("Error al iniciar sesión:", error.message)
            return
        } else {
            navigate("/")
        }
    }
    return (
        <>
            <div className='registro__container'>
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleLogin} className='registro__form'>
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
                    <button type="submit">Iniciar sesión</button>
                </form>
                <p>¿No tienes cuenta? <a href="/registro">Regístrate</a></p>
            </div >
        </>
    )
}

export default Login