import { httpClient } from "../httpClient"

export const TOKEN_KEY = "@token";
export const USER_KEY = "@user";
export const LoginUser = async (body) => {

    const response = await httpClient('/api/Auth/login', 'POST', body, null);
    localStorage.setItem(TOKEN_KEY, response.token);
    return response;
}

export const SaveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export const SignUp = async (body) => {

    const response = await httpClient('/api/Auth/cadastro', 'POST', body, null);
    return response
}
export const EditUser = async (body, id) => {
    const token = GetToken();
    const response = await httpClient(`/api/Auth/atualizar-usuario/${id}`, 'PUT', body, token);
    return response;
}
export const GetUserById = async (id) => {
    const token = GetToken();
    const response = await httpClient(`/api/Auth/pegar-usuario-por-id/${id}`, 'GET', null, token);
    return response;
}
export const Logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export const GetToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}
export const GetUser = () => {
    return localStorage.getItem(USER_KEY);
}
export const IsAutenticated = () => localStorage.getItem(TOKEN_KEY) !== null;