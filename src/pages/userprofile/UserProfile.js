import React, { useState, useCallback, useContext, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './UserProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { debounce } from 'lodash';
import { GoPencil } from "react-icons/go";
import UserContext from '../../context/UserContext';
import { GetFilmesFavoritos, RemoveFavoriteMovie } from '../../services/Movie';
import { toast } from 'react-toastify';
const UserProfile = () => {
  const [favorites, setFavorites] = useState({
    movies: [],
    actors: [],
    directors: [],
  });
  const [category, setCategory] = useState('movies');
  const [loading, setLoading] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const apiUrl = 'https://api.themoviedb.org/3';
  const {user, setUser} = useContext(UserContext);
  const fetchItems = async () => {
    
    setLoading(true);
    try {
      const res = await GetFilmesFavoritos(parseInt(user.id));
      let listaFilmesFavoritos = res.dados;
      let arrayMovies = [];
      if(res.status){
        for (let index = 0; index < listaFilmesFavoritos.length; index++) {
          const movieResponse = await fetch(`${apiUrl}/movie/${listaFilmesFavoritos[index].idFilmeTMDB}?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
          const movieData = await movieResponse.json();
          arrayMovies.push({
            title: movieData.title,
            poster_path: movieData.poster_path,
            original_title: movieData.original_title,
            bancoId: listaFilmesFavoritos[index].id
          });
        }
        
        // Atualizando o estado corretamente
        setFavorites((prevState) => ({
          ...prevState,
          movies: arrayMovies
        }));
      }else{
        setFavorites((prevState) => ({
          ...prevState,
          movies: []
        }));
      }
      
      
      
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      toast.error("Erro ao buscar itens:" + error, {position: 'top-left'})
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchItems();
  }, []);
  

  const handleRemoveFavorite = async (id) => {
    setLoading(true);
    try {
      const deletado = await RemoveFavoriteMovie(id);
      if (deletado) {
        setFavorites((prevState) => ({
          ...prevState,
          movies: prevState.movies.filter(movie => movie.bancoId !== id)
        }));
        toast.success("Filme deletado com sucesso da sua lista de favoritos", {position: 'top-left'});
      }
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      toast.error("Erro ao remover item:" + error, {position: 'top-left'})
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="user-profile-background text-light main-div min-vh-100">
      <Navbar />
      <div className="container text-center mt-5">
      <div className="w-100 d-flex align-items-center justify-content-end">
            <button 
                  type='button'
                  className="btn btn-light d-flex align-items-center justify-content-center"
                   data-bs-toggle="modal" data-bs-target="#exampleModal"
                  style={{ width: '42px', height: '38px' }}
                >
                  <GoPencil style={{ fontSize: '28px', color: '#000' }} />
                </button>
          </div>
        {/* Seção do Perfil */}
        <div className="profile-header mb-5">
          
          <div className="profile-image-container">
            <img
              src="https://via.placeholder.com/150" // URL de placeholder para a imagem de perfil
              alt="Foto de Perfil"
              className="profile-image"
            />
          </div>
          <div className="profile-info">
           
            <h2 className="profile-name">{user.username}</h2>
            <p className="profile-description">Adoro David Lynch 💋</p>
            <p className="profile-location">📍 India</p>
            
          </div>
          
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog ">
            <div class="modal-content edicao">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edição</h1>
              </div>
              <div class="modal-body">
              <form >
                <div className="form-group">
                  <label>Descrição</label>
                  <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                    placeholder="Digite alguma descrição sua"
                  />
                </div>
                <div className="form-group">
                  <label>Localização</label>
                  <input
                    type="text"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                    required
                    placeholder="Digite sua localização"
                  />
                </div>
                

                
              </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="submit" class="btn btn-light">Editar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Seção para Adicionar Favoritos */}
        <div className="my-4">
          <select 
            className="form-select form-select-lg mb-3"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            style={{ maxWidth: '450px', margin: '0 auto' }}
          >
            <option value="movies">Filmes Favoritos</option>
            <option value="actors">Atores Favoritos</option>
            <option value="directors">Diretores Favoritos</option>
          </select>
         
        </div>

        {loading && <p>Carregando...</p>}

        

        <div className="favorites-container mt-4">
          {/* Favoritos com Imagens */}
          <h2 className='text-center'>{category === 'movies' ? 'Filmes Favoritos:' : category === 'actors' ? 'Atores Favoritos:' : 'Diretores Favoritos:'}</h2>
          <div className="favorites-list">
            {favorites[category].slice(0, 5).map((item, index) => (
              <div key={index} className="card h-100 bg-secondary text-light border-0 d-flex flex-column position-relative">
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path || item.profile_path}`}
                  className="card-img-top"
                  alt={item.title || item.original_title}
                  style={{
                    height: '300px',
                    objectFit: 'cover',
                  }}
                />
                <button
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFavorite(item.bancoId)}
                >
                  ✕
                </button>
                <div className="card-body d-flex align-items-center justify-content-center" style={{ padding: '10px' }}>
                  <h5
                    className="card-title text-center"
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: '18px',
                      width: '100%',
                    }}
                  >
                    {item.title || item.original_title}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
