import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWineBottle, faCartShopping, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Auth/AuthProvider";
import { logoutUsuario } from "../backend/services";
import logotipo_dorado from "../assets/logotipo_dorado.png";

function Header() {
    const { user } = useAuth();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const handleCerrarSesion = async () => {
        try {
            await logoutUsuario();
            setIsUserDropdownOpen(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
        }
    };

    return (
        <header>
            <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <defs>
                    <radialGradient id="mancha-dorada" cx="80%" cy="80%" r="75%" fx="80%" fy="80%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="35%" stopColor="#E8DCC3" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                    </radialGradient>
                </defs>
            </svg>

            <a className="a-logo" href="/">
                <img src={logotipo_dorado} alt="Cosecha Joven" />
                <span className="brand-text">COSECHA JOVEN</span>
            </a>

            <nav>
                <ul className="icons-align">
                    <li>
                        <a href="/vinos" title="Vinos" className="icon-link-container">
                            <FontAwesomeIcon icon={faWineBottle} className="icon-menu" />
                        </a>
                    </li>
                    <li
                        className="user-menu-item"
                        onMouseEnter={() => { if (user) setIsUserDropdownOpen(true); }}
                        onMouseLeave={() => setIsUserDropdownOpen(false)}
                    >
                        <a href="/login" title="Cuenta" className="icon-link-container">
                            <FontAwesomeIcon icon={faUser} className="icon-menu" />
                            {user && <span className="user-name-text">{user.user_metadata?.full_name || user.email}</span>}
                        </a>

                        {user && isUserDropdownOpen && (
                            <div className="user-dropdown-content">
                                <p className="dropdown-email-display">{user.email}</p>
                                <button onClick={handleCerrarSesion} className="dropdown-logout-button">
                                    <FontAwesomeIcon icon={faSignOutAlt} className="icon-button-margin" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </li>
                    <li>
                        <a href="/carrito" title="Carrito" className="icon-link-container">
                            <FontAwesomeIcon icon={faCartShopping} className="icon-menu" />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;