import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from "./AuthStatus";

export const Layout = () => {
  return (
    <>
      <AuthStatus />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/acerca-de">Acerca de...</Link>
          </li>
          <li>
            <Link to="/perfil">Mi perfil</Link>
          </li>
          <li>
            <Link to="/tareas">Tareas</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
