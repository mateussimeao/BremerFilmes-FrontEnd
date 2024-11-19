import React, { useState, useEffect, useContext } from 'react';
import './ActorPage.css';
import Navbar from '../../components/navbar/Navbar';
import { useParams, Link } from 'react-router-dom';

import Footer from '../../components/footer/Footer';

import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { AddPersonFavorite, DeletePersonFavorite, GetPersonFavorite } from '../../services/PersonFavorite';
import UserContext from '../../context/UserContext';
import { toast } from 'react-toastify';

const ActorPage = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState();
  const {user} = useContext(UserContext);
  useEffect(() => {
    const fetchActorData = async () => {
      try {
        if(user.id !== 0){
          const actorResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
          const actorData = await actorResponse.json();
  
          const moviesResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
          const moviesData = await moviesResponse.json();
          const responseFilmeFav = await GetPersonFavorite(parseInt(user.id), actorId, actorData.known_for_department);
          console.log(responseFilmeFav)
          if(responseFilmeFav.status){
            setIsFavorite(true);
          }else{
            setIsFavorite(false);
          }
          setActor(actorData);
          setMovies(moviesData.cast);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do ator", error);
      }
    };

    fetchActorData();
  }, [user]);

  const toggleFavorite = async () => {
    try {
      console.log(isFavorite);
      if(!isFavorite){
        await AddPersonFavorite({idPessoaTMDB: actorId, idUsuario: parseInt(user.id), cargo: actor.known_for_department})
        toast.success("Ator adicionado com sucesso na sua lista de favoritos", {position: 'top-left'});
      }else{
        const responseFilmeFav = await GetPersonFavorite(parseInt(user.id), actorId, actor.known_for_department);
        await DeletePersonFavorite(responseFilmeFav.dados.id);
        toast.success("Ator deletado com sucesso da sua lista de favoritos", {position: 'top-left'});
      }
      setIsFavorite(prevState => !prevState);
      
    } catch (error) {
      
      toast.error(`Ops! aconteceu alguma coisa e nao conseguimos adicionar o seu diretor favorito: ${error.message}`, {position:'top-left'});
      console.error();
    }
  };

  if (!actor) return <div>Carregando...</div>;

  return (
    <div className="main-div">
      <Navbar />
      <div className="fundo-cor px-5">
        <div className="row actor-detail align-items-start">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className="img-fluid rounded"
            />
          </div>
          
          <div className="col-md-8">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <button onClick={toggleFavorite} className="btn btn-light me-2">
                    {isFavorite ? <MdFavorite style={{ color: 'red' }} /> : <MdFavoriteBorder />}
                  </button>
                </div>
              </div>
            <h1 className="actor-name-page">{actor.name}</h1>
            <p className="actor-bio">{actor.biography ? actor.biography : "Biografia não disponível"}</p>
          </div>
        </div>

        <h2 className="actor-movies-title mt-4">Aparece em:</h2>
        <div className="row actor-movies">
          {movies.slice(0, 5).map(movie => (
            <div key={movie.id} className="col-6 col-md-3 col-lg-2 mb-4">
              <div className="movie-item text-center">
                <Link to={`/movie/${movie.id}`} className="movie-link">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/default-movie-poster.jpg'}
                    alt={movie.title}
                    className="movie-poster img-fluid rounded mb-2"
                  />
                  <p className="movie-title-actor">{movie.title.length > 15 ? movie.title.slice(0, 15) + '...' : movie.title}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActorPage;