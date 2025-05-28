import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Auth/AuthProvider";
import { logoutUsuario } from "../backend/services";
import { useState } from "react";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
function Header() {
    const { user, loading } = useAuth();
    console.log("User in Header:", user);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const handleCerrarSesion = async () => {
        try {
            await logoutUsuario();
            setIsUserDropdownOpen(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
        }
    }
    return (
        <>
            <header>
                <a className="a-logo" href="/"><img src={logo} alt="Cosecha Joven" />COSECHA JOVEN</a>
                <nav>
                    <ul>
                        <li><a href="/vinos" title="Vinos"><FontAwesomeIcon icon={faWineBottle} className="icon-menu" /></a></li>
                        <li
                            className="user-menu-item"
                            onMouseEnter={() => { if (user) setIsUserDropdownOpen(true); }}
                            onMouseLeave={() => setIsUserDropdownOpen(false)}
                        >
                            <a href="/login" title="Cuenta">
                                <FontAwesomeIcon icon={faUser} className="icon-menu" />
                                {user ? (user.user_metadata?.display_name || user.email) : ''}
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
                        <li><a href="/carrito" title="Carrito"><FontAwesomeIcon icon={faCartShopping} className="icon-menu" /></a></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
export default Header;
