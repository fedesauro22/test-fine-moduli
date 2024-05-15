import { useState } from "react";
import { getToken, getTokenRuoli } from "../../services/config/CookieService";
import { updateCourse } from "../../services/config/RESTService";

export function CourseCard({ Id, Titolo, Descrizione, Durata, Categoria }) {
    const ruolo = getTokenRuoli();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: Id,
        nomeCorso: Titolo,
        descrizioneBreve: Descrizione,
        descrizioneCompleta: Descrizione,
        durata: Durata,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = getToken();
        updateCourse(formData, token);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        deleteCourse(Id);
    };

    return (
        <div className="card mt-3 mb-3" style={{ width: "18rem" }}>
            <div className="card-body">
                {isEditing ? (
                    <form onSubmit={handleUpdate}>
                        <input type="hidden" name="id" value={formData.id} />
                        <input type="text" name="titolo" value={formData.nomeCorso} onChange={handleChange} />
                        <input type="text" name="descrizione" value={formData.descrizioneBreve} onChange={handleChange} />
                        <input type="number" name="durata" value={formData.durata} onChange={handleChange} />

                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-success">
                                Salva
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                Annulla
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h5 className="card-title">{Titolo}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{Descrizione}</h6>
                        <p className="card-text">Durata: {Durata} ore</p>
                        <p className="card-text">Categoria: {Categoria}</p>
                        {(ruolo == "Admin" || ruolo == "Docente") && (
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" onClick={handleEdit}>
                                    Modifica
                                </button>
                                {ruolo == "Admin" && (
                                    <button className="btn btn-danger" onClick={handleDelete}>
                                        Elimina
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
