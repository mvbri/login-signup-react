import { Link } from "react-router-dom";
import logo from "../img/logo.jpeg";

function DefaultLayout({ children }) {
  return (
    <>
      <header className="mb-4">
        <nav className="px-3 py-2 flex items-center">
          <Link to="/">
            <img
              className="w-[80px] h-[80px] rounded-full"
              src={logo}
              alt="Logo"
            />
          </Link>
          <Link
            className="ml-4 text-secondary hover:text-secondary-accent"
            to="/"
          >
            Ver Tienda
          </Link>
          <Link
            className="ml-4 text-secondary hover:text-secondary-accent"
            to="/login"
          >
            Iniciar sesión como cliente
          </Link>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

export default DefaultLayout;
