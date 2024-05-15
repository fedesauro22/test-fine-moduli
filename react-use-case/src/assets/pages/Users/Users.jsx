import { useEffect, useState } from "react";
import { UserCard } from "../../components/UserCard/UserCard";
import { getAllUsers } from "../../services/config/RESTService";
import { getToken } from "../../services/config/CookieService";
export function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        //senza ogni tanto restituisce errore di destroy
        const fetchData = async () => {
            const token = getToken();
            const usersData = await getAllUsers(token);
            setUsers(usersData);
        };
        fetchData();
    }, []);
    return (
        <div className="container">
            <h1 className="text-center">Lista degli utenti:</h1>
            <div className="row">
                {users.map((user, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mv-4">
                        <UserCard Nome={user.nome} Cognome={user.cognome} Email={user.email} Ruoli={user.ruoli} />
                    </div>
                ))}
            </div>
        </div>
    );
}
