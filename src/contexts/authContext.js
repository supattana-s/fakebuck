import { createContext, useContext, useState } from "react";
import * as authService from "../api/authApi";
import { addAccessToken, removeAccessToken } from "../utils/localStorage";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const register = async (input) => {
        const res = await authService.register(input);
        // setUser(true);
        setTimeout(() => setUser(true), 1);
        addAccessToken(res.data.token);
    };

    const login = async (input) => {
        const res = await authService.login(input);
        setUser(true);
        addAccessToken(res.data.token);
    };

    const logout = () => {
        setUser(null);
        removeAccessToken();
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContextProvider;
