import { httpClient } from "../httpClient"


export const AddFaavoriteMovie = async (body, token) => {
    const response = await httpClient('/api/FilmeFavorito/adicionar-filme-favorito',  
        {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "*/*",
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify(body)
    });
    return response;
}

export const RemoveFavoriteMovie = async (id, token) => {
    const response = await httpClient(`/api/FilmeFavorito/deletar-filme-favorito/${id}`, 
        {
            method: 'DELETE', 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "*/*",
                'Authorization': `Bearer ${token}`
            }
    }

    );
    return response;
}

export const GetFilmesFavoritos = async (idUsuario, token) => {
    const response = await httpClient(`/api/FilmeFavorito/pegar-filme-favorito-por-usuario/${idUsuario}`, 
        {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "*/*",
                'Authorization': `Bearer ${token}`
            }
    }

    );
    return response;
}