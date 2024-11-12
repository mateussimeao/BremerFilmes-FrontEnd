import { httpClient } from "../httpClient"

export const TOKEN_KEY = "@token";
export const LoginUser = async (body) => {
    console.log(body);
    const response = await httpClient('/api/Auth/login', {method: 'POST', headers: {"Content-Type": "application/json", "Accept": "*/*"}, body: JSON.stringify(body)});
    console.log(response)
    localStorage.setItem(TOKEN_KEY, response.token);
    console.log(localStorage.getItem(TOKEN_KEY));
    return response;
}

export const SignUp = async (body) => {
    console.log(body)
    const response = await httpClient('/api/Auth/cadastro', {method: 'POST', headers: {"Content-Type": "application/json", "Accept": "*/*"}, body: JSON.stringify(body)});
    return response
}

export const Logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const GetToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const IsAutenticated = () => localStorage.getItem(TOKEN_KEY) != null;