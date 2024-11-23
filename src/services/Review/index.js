import { httpClient } from "../httpClient";
import { GetToken } from "../User"


export const AddReview = async (body) => {
    const token = GetToken();
    const response = await httpClient('/api/ReviewFilme/criar-review', 'POST', body, token);
    return response
}

export const RemoveReview = async (id) => {
    const token = GetToken();
    const response = await httpClient(`/api/ReviewFilme/deletar-review/${id}`, 'DELETE', null, token);
    return response
}

export const GetReviewsByFilmeId = async (idTmdbFilme) => {
    const token = GetToken();
    const response = await httpClient(`/api/ReviewFilme/pegar-reviews-de-filme/${idTmdbFilme}`, 'GET', null, token);
    return response
}

export const GetReviewsByUser = async (idUsuario) => {
    const token = GetToken();
    const response = await httpClient(`/api/ReviewFilme/pegar-reviews-de-usuario/${idUsuario}`, 'GET', null, token);
    return response
}

export const EditCommentReview = async (body) => {
    const token = GetToken();
    const response = await httpClient(`/api/ReviewFilme/editar-review`, 'PUT', body, token);
    return response
}

export const Like = async (id) => {
    const token = GetToken();
    const response = await httpClient(`/api/ReviewFilme/dar-curtida/${id}`, 'PUT', null, token);
    return response
}