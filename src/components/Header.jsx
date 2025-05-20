import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
function Header() {

    return (
        <>
            <header>
                <a className="a-logo" href="/"><h1>Reserva Juventud</h1></a>
                <nav>
                    <ul>
                        <li><a href="/vinos" title="Vinos"><FontAwesomeIcon icon={faWineBottle} className="icon-menu" />Vinos</a></li>
                        <li><a href="#contact" title="Contacto"><FontAwesomeIcon icon={faUser} className="icon-menu" />Contacto</a></li>
                        <li><a href="#car" title="Carrito"><FontAwesomeIcon icon={faCartShopping} className="icon-menu" />Carrito</a></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
export default Header;
