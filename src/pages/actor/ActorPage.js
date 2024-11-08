import React, { useState, useEffect } from 'react';
import './ActorPage.css';
import Navbar from '../../components/navbar/Navbar';
import { useParams, Link } from 'react-router-dom';

const ActorPage = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const actorResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
        const actorData = await actorResponse.json();

        const moviesResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=45eb858eef4393990a83b95485543080&language=pt-BR`);
        const moviesData = await moviesResponse.json();

        setActor(actorData);
        setMovies(moviesData.cast);
      } catch (error) {
        console.error("Erro ao buscar os dados do ator", error);
      }
    };

    fetchActorData();
  }, [actorId]);

  if (!actor) return <div>Carregando...</div>;

  return (
    <div className="main-div">
      <Navbar />
      <div className="container mt-4">
        <div className="row actor-detail align-items-start">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h1 className="actor-name-page">{actor.name}</h1>
            <p className="actor-bio">{actor.biography ? actor.biography : "Biografia não disponível"}</p>
          </div>
        </div>

        <h2 className="actor-movies-title mt-4">Filmes</h2>
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
                  <p className="movie-title">{movie.title}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorPage;