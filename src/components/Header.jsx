
function Header() {

    return (
        <>
            <header>
                <a className="a-logo" href="Home"><h1>Mi Aplicación</h1></a>
                <nav>
                    <ul>
                        <li><a className="a-menu" href="#products">Productos</a></li>
                        <li><a className="a-menu" href="#contact">Contacto</a></li>
                        <li><a className="a-menu" href="#count">Cuenta</a></li>
                        <li><a className="a-menu" href="#car">Carrito</a></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
export default Header;
