import { useState } from "react";
import { insertCourse } from "../../services/config/RESTService";

export function CourseRegistrationForm() {
    const initialFormData = {
        titolo: "",
        descrizione: "",
        durata: "",
        categoria: "",
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

        if (!formData.titolo || !formData.descrizione || !formData.durata || !formData.categoria) {
            setStatus("incomplete-fields");
            return;
        }

        const response = await insertCourse(formData);
        if (response == 200) {
            setStatus("success");
            setFormData(initialFormData);
        } else {
            setStatus("api-error");
        }
    };
    return (
        <form style={{ width: "20rem" }} className="mx-auto mt-3" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Registrazione Corso</h1>
            <input type="text" name="titolo" className="form-control" placeholder="Titolo" value={formData.titolo} onChange={handleChange} />
            <input type="text" name="descrizione" className="form-control" placeholder="Descrizione" value={formData.descrizione} onChange={handleChange} />
            <input type="number" name="durata" className="form-control" placeholder="Durata (ore)" value={formData.durata} onChange={handleChange} />
            <input type="text" name="categoria" className="form-control" placeholder="Categoria" value={formData.categoria} onChange={handleChange} />
            <div className="d-flex justify-content-between align-items-center mt-2">
                <button type="submit" className="btn btn-primary">
                    Registrati
                </button>
            </div>
            {submitStatus == "success" && (
                <div className="alert alert-success mt-2" role="alert">
                    Corso registrato con successo!
                </div>
            )}
            {submitStatus == "api-error" && (
                <div className="alert alert-danger mt-2" role="alert">
                    Si è verificato un errore durante la registrazione del corso. Riprova più tardi.
                </div>
            )}
            {submitStatus == "incomplete-fields" && (
                <div className="alert alert-danger mt-2" role="alert">
                    Per favore, compila tutti i campi.
                </div>
            )}
        </form>
    );
}
