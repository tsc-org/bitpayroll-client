import { useContext } from "react";
import { AuthContext, authContextType } from "../context/authContext";

const useAuth = () => {
    return useContext(AuthContext) as authContextType
}

export default useAuth;