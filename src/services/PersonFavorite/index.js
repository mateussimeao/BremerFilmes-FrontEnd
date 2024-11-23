import { httpClient } from "../httpClient"
import { GetToken } from "../User"


export const AddPersonFavorite = async (body) => {
    const token = GetToken();
    const response = await httpClient('/api/PessoaFavorita/adicionar-pessoa-favorita', 'POST', body, token);
    return response;
}

export const DeletePersonFavorite = async (id) => {
    const token = GetToken();
    const response = await httpClient(`/api/PessoaFavorita/deletar-pessoa-favorita/${id}`, 'DELETE', null, token);
    return response;
}

export const GetPersonFavorite = async (idUsuario, idPerson, cargo) => {
    const token = GetToken();
    const response = await httpClient(`/api/PessoaFavorita/pegar-pessoa-favorita-por-usuario-e-cargo/${idUsuario}/${idPerson}/${cargo}`, 'GET', null, token);
    return response;
}

export const GetDirectorsFavorites = async (idUsuario) => {
    const token = GetToken();
    const response = await httpClient(`/api/PessoaFavorita/pegar-diretores-favoritos-por-usuario/${idUsuario}`, 'GET', null, token);
    return response;
}

export const GetActorsFavorites = async (idUsuario) => {
    const token = GetToken();
    const response = await httpClient(`/api/PessoaFavorita/pegar-atores-favoritos-por-usuario/${idUsuario}`, 'GET', null, token);
    return response;
}