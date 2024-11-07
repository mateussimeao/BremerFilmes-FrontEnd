import React, { useState, useEffect } from 'react';
import './Movie.css';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import { CgSmile, CgSmileNeutral, CgSmileSad } from "react-icons/cg";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { GoPencil } from "react-icons/go";

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
                <img
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/path/to/default-avatar.jpg'}
                  alt={actor.name}
                  className="actor-photo img-fluid rounded-circle mb-2"
                />
                <p className="actor-name">{actor.name}</p>
                <p className="actor-character">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
