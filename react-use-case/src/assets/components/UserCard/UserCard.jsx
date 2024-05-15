import { useState } from "react";
import { updateUser, deleteUser } from "../../services/config/RESTService";
import { useNavigate } from "react-router-dom";

export function UserCard({ Nome, Cognome, Email, Ruoli }) {
    const initialFormData = {
        nome: Nome,
        cognome: Cognome,
        email: Email,
        ruoloId: 1,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const navigateTo = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "ruoli") {
            setFormData({ ...formData, ruoloId: parseInt(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateUser(formData);
        setIsEditing(false);
        navigateTo("/");
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = async () => {
        await deleteUser(formData.email);
        navigateTo("/");
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="card mt-3 mb-3" style={{ width: "18rem" }}>
            <div className="card-body">
                {isEditing ? (
                    <form onSubmit={handleUpdate}>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                        <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} />
                        <input type="hidden" name="email" value={formData.email} onChange={handleChange} />
                        <select name="ruoli" onChange={handleChange}>
                            <option value="1">Admin</option>
                            <option value="2">Docente</option>
                            <option value="3">Utente</option>
                        </select>

                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-success">
                                Salva
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                Annulla
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h5 className="card-title">{formData.nome}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{formData.cognome}</h6>
                        <p className="card-text">{formData.email}</p>
                        <div>
                            {Ruoli.map((ruolo, index) => (
                                <p className="card-text" key={index}>
                                    {ruolo.tipologia}
                                </p>
                            ))}
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" onClick={handleEdit}>
                                Modifica
                            </button>
                            <button className="btn btn-danger" onClick={handleDelete}>
                                Elimina
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
