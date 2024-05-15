import { NavLink, useNavigate } from "react-router-dom";
import myStyle from "./Navbar.module.css";
import { isTokenExpired, getToken, getTokenRuoli, getTokenNome, getTokenEmail, deleteToken } from "../../services/config/CookieService";
import { deleteUser } from "../../services/config/RESTService";

export function Navbar() {
    const navigateTo = useNavigate();
    const handleDelete = async () => {
        await deleteUser(getTokenEmail());
        deleteToken();
        navigateTo("/");
    };
    const handleLogout = () => {
        deleteToken();
        navigateTo("/");
    };
    const token = getToken();
    const nome = !isTokenExpired() ? getTokenNome() : null;
    const ruoli = !isTokenExpired() ? getTokenRuoli() : null;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid" style={{ maxWidth: "100vh" }}>
                <NavLink className="navbar-brand" to="/">
                    Gestionale Corsi
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            
                        </li>
                    </ul>
                    {!token && (
                        <NavLink className="nav-link" to="/user/register">
                            <span className="btn btn-primary">Registrati</span>
                        </NavLink>
                    )}
                    {token && (
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ciao, {nome}
                            </button>
                            {ruoli == "Admin" ? (
                                <ul className={`${myStyle.dropdownList} dropdown-menu dropdown-menu-lg-start`} aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <NavLink className={`${myStyle.dropdownItem}`} to="/courses/insert">
                                            Inserisci Corsi
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={`${myStyle.dropdownItem}`} to="/user/users">
                                            Gestisci Utenti
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button type="submit" className="btn" onClick={handleDelete}>
                                            Elimina Profilo
                                        </button>
                                    </li>
                                    <li>
                                        <button type="submit" className="btn" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            ) : ruoli == "Docente" ? (
                                <ul className={`${myStyle.dropdownList} dropdown-menu dropdown-menu-lg-start`} aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <NavLink className={`${myStyle.dropdownItem}`} to="/courses/">
                                            Visualizza Corsi
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={`${myStyle.dropdownItem}`} to="/">
                                            Modifica Corsi
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button type="submit" className="btn" onClick={handleDelete}>
                                            Elimina Profilo
                                        </button>
                                    </li>
                                    <li>
                                        <button type="submit" className="btn" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            ) : (
                                <ul className={`${myStyle.dropdownList} dropdown-menu dropdown-menu-end`} aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <NavLink className={`${myStyle.dropdownItem}`} to="/courses/">
                                            Visualizza Corsi
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button type="submit" className="btn" onClick={handleDelete}>
                                            Elimina Profilo
                                        </button>
                                    </li>
                                    <li>
                                        <button type="submit" className="btn" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
