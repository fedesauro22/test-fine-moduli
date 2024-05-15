import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/config/RESTService";
import { setJWTCookies } from "../../services/config/CookieService";
import { NavLink } from "react-router-dom";
export function UserLoginForm() {
    const initialFormData = {
        email: "",
        password: "",
    };
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [submitStatus, setSubmitStatus] = useState(null);
    const setStatus = (status) => setSubmitStatus(status);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[A-Za-z0-9\.+_\-]+@[A-Za-z0-9\._\-]+\.[A-Za-z]{2,24}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
        if (formData.email.match(emailRegex) && formData.password.match(passwordRegex)) {
            const response = await loginUser(formData);
            if (response) {
                const responseToken = response.token;
                const responseTtl = response.ttl;
                const expireDate = new Date(responseTtl)
                setJWTCookies(responseToken, expireDate);
                navigateTo("/");
            } else {
                setStatus("api-error");
            }
        } else {
            setStatus("user-error");
        }
    };
    return (
        <form style={{ width: "20rem" }} id="login-form" className="mx-auto mt-3" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Accesso Utente</h1>
            <input type="email" name="email" className="form-control" id="userEmail" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" className="form-control" id="userPassword" placeholder="Password" value={formData.password} onChange={handleChange} />
            <div className="d-flex justify-content-between align-items-center mt-2">
                <button type="submit" className="btn btn-primary">
                    Accedi
                </button>
                <NavLink to="/user/register" className="link-secondary">
                    Nuovo utente? Registrati
                </NavLink>
            </div>
            {submitStatus == "user-error" && (
                <div className="alert alert-danger mt-2" role="alert">
                    Per favore, compila tutti i campi correttamente.
                </div>
            )}
            {submitStatus == "api-error" && (
                <div className="alert alert-danger mt-2" role="alert">
                    Si è verificato un errore durante il login. Riprova più tardi.
                </div>
            )}
        </form>
    );
}
