import axios from "../config/axios";
import { getAccessToken } from "../utils/localStorage";

export const register = (input) => axios.post("/auth/register", input);

export const login = ({ emailOrMobile, password }) =>
    axios.post("/auth/login", { emailOrMobile, password });

export const getMe = () => axios.get("/auth/me");
