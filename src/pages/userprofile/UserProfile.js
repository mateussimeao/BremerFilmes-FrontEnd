import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './UserProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoPencil } from "react-icons/go";
import UserContext from '../../context/UserContext';
import { GetFilmesFavoritos, RemoveFavoriteMovie } from '../../services/Movie';
import { toast } from 'react-toastify';
import { EditUser } from '../../services/User';
import { DeletePersonFavorite, GetDirectorsFavorites } from '../../services/PersonFavorite';
import { GetActorsFavorites } from '../../services/PersonFavorite';
import Footer from '../../components/footer/Footer';
const UserProfile = () => {
  const [favorites, setFavorites] = useState({
    movies: [],
    actors: [],
    directors: [],
  });
  const [category, setCategory] = useState('movies');
  const [loading, setLoading] = useState(false);
  const [descricao, setDescricao] = useState('Nada aqui');
  const [localizacao, setLocalizacao] = useState('Nada aqui');
  const apiUrl = 'https://api.themoviedb.org/3';
  const {user, setUser} = useContext(UserContext);
  useEffect( () => {
    const fetchData = async () => {
      
      // Espere pela atualização de `user` antes de tentar acessá-lo.
      if (user.id !== 0) {
          await fetchItems();
          
          setDescricao(user.descricao);
          setLocalizacao(user.localizacao);
      }
  };

  fetchData();

  }, [user]);
  const fetchItems = async () => {
    
    setLoading(true);
    try {
      const res = await GetFilmesFavoritos(parseInt(user.id));
      const resDiretores = await GetDirectorsFavorites(parseInt(user.id))
      const resActors = await GetActorsFavorites(parseInt(user.id));
      let listaFilmesFavoritos = []
      if(res.dados.descricao !== "404"){
        listaFilmesFavoritos = res.dados;
      }

      let listaDiretoresFavoritos = [];
      if(resDiretores.dados.descricao !== "404"){
        listaDiretoresFavoritos = resDiretores.dados;
      }
      let listaAtoresFavoritos = []
      if(resActors.dados.descricao !== "404"){
        listaAtoresFavoritos = resActors.dados;
      }
      
      let arrayMovies = [];
      let arrayDiretores = [];
      let arrayAtores = [];
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
      for (let i = 0; i < listaDiretoresFavoritos.length; i++) {
        const diretor = await fetch(`${apiUrl}/person/${listaDiretoresFavoritos[i].idPessoaTMDB}?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
        const diretorData = await diretor.json();
        arrayDiretores.push({
          name: diretorData.name,
          profile_path: diretorData.profile_path,
          bancoId: listaDiretoresFavoritos[i].id
        });
        
      }
      for (let j = 0; j < listaAtoresFavoritos.length; j++) {
        const ator = await fetch(`${apiUrl}/person/${listaAtoresFavoritos[j].idPessoaTMDB}?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
        const atorData = await ator.json();
        arrayAtores.push({
          name: atorData.name,
          profile_path: atorData.profile_path,
          bancoId: listaAtoresFavoritos[j].id
        });
        
      }
      // Atualizando o estado corretamente
      setFavorites((prevState) => ({
        ...prevState,
        movies: arrayMovies,
        directors: arrayDiretores,
        actors: arrayAtores
      }));
 
      
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      toast.error("Erro ao buscar itens:" + error, {position: 'top-left'})
    } finally {
      setLoading(false);
    }
  };



  
  const handleEdit = async () => {
    try{
      const response = await EditUser({descricao, localizacao}, user.id);
      setUser(response.dados);
      toast.success("Usuario atualizado com sucesso", {position: 'top-left'})
    }catch(error){
      toast.error("Nao foi possível atualizar o usuario: " + error, {position: 'top-left'})
    }
  }

  const handleRemoveFavorite = async (id) => {
    setLoading(true);
    try {
      let deletado = undefined;
      if(category === "movies"){
       deletado = await RemoveFavoriteMovie(id);
       if(deletado){
        setFavorites((prevState) => ({
          ...prevState,
          movies: prevState.movies.filter(movie => movie.bancoId !== id)
        }));
        toast.success("Filme deletado com sucesso da sua lista de favoritos", {position: 'top-left'});
       }
       
      }else if(category === "directors"){
        deletado = await DeletePersonFavorite(id);
        if(deletado){
          setFavorites((prevState) => ({
            ...prevState,
            directors: prevState.directors.filter(director => director.bancoId !== id)
          }));
          toast.success("Diretor deletado com sucesso da sua lista de favoritos", {position: 'top-left'});
        }
        
      }else{
        deletado = await DeletePersonFavorite(id);
        if(deletado){
          setFavorites((prevState) => ({
            ...prevState,
            actors: prevState.actors.filter(actor => actor.bancoId !== id)
          }));
          toast.success("Ator deletado com sucesso da sua lista de favoritos", {position: 'top-left'});
        }
        
      }
      
      
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      toast.error("Erro ao remover item:" + error, {position: 'top-left'})
    }finally{
      setLoading(false);
    }
  };

  if (!user || loading) {
    return <p>Carregando...</p>; // Mostra um fallback enquanto `user` é `undefined`
}

  return (
    <div className="user-profile-background text-light main-div min-vh-100">
      <Navbar />
      <div className="fundo-cor text-center mt-5 ">
      <div className="w-100 d-flex align-items-center justify-content-end margin">
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
           
            <h2 className="profile-name">{user?.username || 'Nada aqui'}</h2>
            <p className="profile-description">{user?.descricao|| 'Nada aqui'}</p>
            <p className="profile-location">{user?.localizacao|| 'Nada aqui'}</p>
            
          </div>
          
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog ">
            <div className="modal-content edicao">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edição</h1>
              </div>
              <div className="modal-body">
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
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" onClick={handleEdit} data-bs-dismiss="modal" className="btn btn-light">Editar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Seção para Adicionar Favoritos */}
        <div className="my-4">
          <select 
            className="form-select form-select-lg mb-3"
            onChange={(e) => {
              setCategory(e.target.value);
            
            }}
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
                  alt={item.title || item.original_title || item.name}
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
                    {item.title || item.original_title || item.name}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
