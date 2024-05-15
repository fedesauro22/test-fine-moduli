import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { getToken } from "../../services/config/CookieService";
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({
        token: getToken(),
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
