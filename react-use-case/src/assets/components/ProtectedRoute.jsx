import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { getTokenRuoli } from "../services/config/CookieService";
export function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    const navigateTo = useNavigate();
    useEffect(() => {
        if (!user.token) {
            navigateTo("/user/login");
        }
        else if(getTokenRuoli() != "Admin" && getTokenRuoli() != "Docente"){
            navigateTo("/");
        }
    }, []);

    return <>{children}</>;
}
