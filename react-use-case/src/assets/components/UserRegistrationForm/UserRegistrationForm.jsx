import { useState } from "react";
import { NavLink } from "react-router-dom";
import { registerUser } from "../../services/config/RESTService";

export function UserRegistrationForm() {
    const initialFormData = {
        nome: "",
        cognome: "",
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const [submitStatus, setSubmitStatus] = useState(null);
    const setStatus = (status) => setSubmitStatus(status);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const nomeRegex = /^[a-zA-Z\s']{5,50}$/;
        const emailRegex = /^[A-Za-z0-9\.+_\-]+@[A-Za-z0-9\._\-]+\.[A-Za-z]{2,24}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
        if (formData.nome.match(nomeRegex) && formData.cognome.match(nomeRegex) && formData.email.match(emailRegex) && formData.password.match(passwordRegex)) {
            const response = await registerUser(formData);
            if (response == 200) {
                setStatus("success");
                setFormData(initialFormData);
            } else {
                setStatus("api-error");
            }
        } else {
            setStatus("user-error");
        }
    };
    return (
        <form style={{ width: "20rem" }} id="registration-form" className="mx-auto mt-3" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Registrazione Utente</h1>
            <input type="text" name="nome" className="form-control" id="firstName" placeholder="Nome" value={formData.nome} onChange={handleChange} />
            <input type="text" name="cognome" className="form-control" id="lastName" placeholder="Cognome" value={formData.cognome} onChange={handleChange} />
            <input type="email" name="email" className="form-control" id="userEmail" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" className="form-control" id="userPassword" placeholder="Password" value={formData.password} onChange={handleChange} />
            <div className="d-flex justify-content-between align-items-center mt-2">
                <button type="submit" className="btn btn-primary">
                    Registrati
                </button>
                <NavLink to="/user/login" className="link-secondary">
                    Iscritto? Accedi
                </NavLink>
            </div>
            {submitStatus == "success" && (
                <div className="alert alert-success mt-2" role="alert">
                    Registrazione avvenuta con successo! <NavLink to="/user/login">Vai al login</NavLink>
                </div>
            )}
            {submitStatus == "user-error" && (
                <div className="alert alert-danger mt-2" role="alert">
                    Per favore, compila tutti i campi correttamente.
                </div>
            )}
            {submitStatus == "api-error" && (
                <div className="alert alert-danger mt-2" role="alert">
                    Si è verificato un errore durante la registrazione. Riprova più tardi.
                </div>
            )}
        </form>
    );
}
