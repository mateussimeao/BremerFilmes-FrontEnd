import React, { useState, useEffect, useContext } from 'react';
import './Movie.css';
import Navbar from '../../components/navbar/Navbar';
import { useParams, Link } from 'react-router-dom'; // Importando Link
import { CgSmile, CgSmileNeutral, CgSmileSad } from "react-icons/cg";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import UserContext from '../../context/UserContext';
import { AddFaavoriteMovie, GetFilmesFavoritosPOrIDFilme, RemoveFavoriteMovie } from '../../services/Movie';
import { toast } from 'react-toastify';

const Movie = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const [movieFav, setMovieFav] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
        const movieData = await movieResponse.json();

        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
        const castData = await castResponse.json();
        console.log(user)
        const responseFilmeFav = await GetFilmesFavoritosPOrIDFilme(parseInt(user.id), movieId);
        console.log(responseFilmeFav)
        if(responseFilmeFav.status){
          setMovieFav(responseFilmeFav.dados);
          setIsFavorite(true);
        }else{
          setIsFavorite(false);
          setMovieFav(null);
        }
        setMovie(movieData);
        setCast(castData.cast);
      } catch (error) {
        console.error("Erro ao buscar os dados do filme", error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (!movie) return <div>Carregando...</div>;

  const toggleFavorite = async () => {
    try {
      console.log(isFavorite);
      if(!isFavorite){
        const response = await AddFaavoriteMovie({idFilmeTMDB: parseInt(movieId), idUsuario: parseInt(user.id)});
        toast.success("Filme adicionado com sucesso na sua lista de favoritas", {position: 'top-left'});
      }else{
        const responseFilmeFav = await GetFilmesFavoritosPOrIDFilme(parseInt(user.id), movieId);
        setMovieFav(responseFilmeFav.dados);
        const deletado = await RemoveFavoriteMovie(responseFilmeFav.dados.id);
        
        toast.success("Filme deletado com sucesso da sua lista de favoritos", {position: 'top-left'});
      }
      setIsFavorite(prevState => !prevState);
      
    } catch (error) {
      
      toast.error(`Ops! aconteceu alguma coisa e nao conseguimos adicionar o seu filme: ${error.message}`, {position:'top-left'});
      console.error();
    }
  };

  const handleReviewClick = () => {
    console.log("review clicado");
  };

  return (
    <div className="main-div">
      <Navbar />
      <div className="container mt-4">
        <div className="row movie-detail align-items-start">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="movie-title">{movie.title}</h1>
              <div className="d-flex align-items-center">
                <button onClick={toggleFavorite} className="btn btn-light me-2">
                  {isFavorite ? <MdFavorite style={{ color: 'red' }} /> : <MdFavoriteBorder />}
                </button>
                <button 
                  onClick={handleReviewClick} 
                  className="btn btn-light d-flex align-items-center justify-content-center"
                  style={{ width: '42px', height: '38px' }}
                >
                  <GoPencil style={{ fontSize: '28px', color: '#000' }} />
                </button>
              </div>
            </div>
            <div className="movie-details-line d-flex gap-3">
              <span>{new Date(movie.release_date).toLocaleDateString()}</span>
              <span>{movie.runtime} min</span>
              <span>
                {movie.vote_average}
                {movie.vote_average <= 4 && <CgSmileSad style={{ marginLeft: '10px', color: 'red' }} />}
                {movie.vote_average > 4 && movie.vote_average <= 6.9 && <CgSmileNeutral style={{ marginLeft: '10px', color: 'yellow' }} />}
                {movie.vote_average >= 7 && <CgSmile style={{ marginLeft: '10px', color: 'green' }} />}
              </span>
            </div>

            <div className="movie-genres my-2">
              {movie.genres.map(genre => (
                <span key={genre.id} className="badge bg-secondary me-2">{genre.name}</span>
              ))}
            </div>

            <p className="movie-overview">{movie.overview}</p>
          </div>
        </div>

        <h2 className="movie-cast-title mt-4">Elenco principal</h2>
        <div className="row movie-cast">
          {cast.slice(0, 5).map(actor => (
            <div key={actor.id} className="col-6 col-md-3 col-lg-2 mb-4">
              <div className="cast-member text-center">
                <Link to={`/actor/${actor.id}`} className="actor-link">
                  <img
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/path/to/default-avatar.jpg'}
                    alt={actor.name}
                    className="actor-photo img-fluid rounded mb-2"
                  />
                  <p className="actor-name">{actor.name}</p>
                  <p className="actor-character">{actor.character}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
