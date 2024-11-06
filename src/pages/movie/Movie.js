import React, { useState, useEffect } from 'react';
import './Movie.css';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import { CgSmile } from "react-icons/cg";
import { CgSmileNeutral } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const Movie = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
        const movieData = await movieResponse.json();

        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
        const castData = await castResponse.json();

        setMovie(movieData);
        setCast(castData.cast);
      } catch (error) {
        console.error("Erro ao buscar os dados do filme", error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (!movie) return <div>Carregando...</div>;

  const toggleFavorite = () => {
    setIsFavorite(prevState => !prevState);
  };

  return (
    <div>
      <Navbar />
      <div className="movie-container">
        <div className="movie-detail">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-info">
            <div className="movie-title-container">
              <h1 className="movie-title">{movie.title}</h1>
              <button onClick={toggleFavorite} className="favorite-btn">
                {isFavorite ? <MdFavorite style={{ color: 'red' }} /> : <MdFavoriteBorder />}
              </button>
            </div>

            <div className="movie-details-line">
              <span className="movie-release-date">{new Date(movie.release_date).toLocaleDateString()}</span>
              <span className="movie-runtime">{movie.runtime} min</span>
              <span className="movie-vote">
                {movie.vote_average}
                {movie.vote_average <= 4 && <CgSmileSad style={{ marginLeft: '10px', color: 'red' }} />}
                {movie.vote_average > 4 && movie.vote_average <= 6.9 && <CgSmileNeutral style={{ marginLeft: '10px', color: 'yellow' }} />}
                {movie.vote_average >= 7 && <CgSmile style={{ marginLeft: '10px', color: 'green' }} />}
              </span>
            </div>

            <div className="movie-genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="movie-genre">{genre.name}</span>
              ))}
            </div>

            <p className="movie-overview">{movie.overview}</p>
          </div>
        </div>
        <p className="movie-cast-title">Elenco principal</p>
        <div className="movie-cast">
          {cast.slice(0, 5).map(actor => (
            <div key={actor.id} className="cast-member">
              <img
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/path/to/default-avatar.jpg'}
                alt={actor.name}
                className="actor-photo"
              />
              <p className="actor-name">{actor.name}</p>
              <p className="actor-character">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
