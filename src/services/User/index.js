import { httpClient } from "../httpClient"

export const TOKEN_KEY = "@token";
export const LoginUser = async (body) => {

    const response = await httpClient('/api/Auth/login', 'POST', body, null);
    localStorage.setItem(TOKEN_KEY, response.token);
    return response;
}

export const SignUp = async (body) => {

    const response = await httpClient('/api/Auth/cadastro', 'POST', body, null);
    return response
}

export const Logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const GetToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const IsAutenticated = () => localStorage.getItem(TOKEN_KEY) != null;