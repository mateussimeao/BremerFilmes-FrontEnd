import { httpClient } from "../httpClient"
import { GetToken } from "../User";


export const AddFaavoriteMovie = async (body) => {
    const token = GetToken()
    const response = await httpClient('/api/FilmeFavorito/adicionar-filme-favorito','POST', body, token);
    return response;
}

export const RemoveFavoriteMovie = async (id) => {
    const token = GetToken()
    const response = await httpClient(`/api/FilmeFavorito/deletar-filme-favorito/${id}`,'DELETE', null, token);
    return response;
}

export const GetFilmesFavoritos = async (idUsuario) => {
    const token = GetToken()
    const response = await httpClient(`/api/FilmeFavorito/pegar-filme-favorito-por-usuario/${idUsuario}`,'GET', null, token);
    return response;
}

export const GetFilmesFavoritosPOrIDFilme = async (idUsuario, idFilme) => {
    const token = GetToken()
    const response = await httpClient(`/api/FilmeFavorito/pegar-filme-favorito-do-usuario/${idUsuario}/${idFilme}`,'GET', null, token);
    return response;
}