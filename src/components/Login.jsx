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
            console.log("Usuario logueado:", data)
            navigate("/")
        }
    }
    return (
        <>
            <div>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </>
    )
}

export default Login