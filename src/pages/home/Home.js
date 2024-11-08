import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../img/logo.png';
import { debounce } from 'lodash';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  const apiKey = '45eb858eef4393990a83b95485543080';
  const apiUrl = 'https://api.themoviedb.org/3/search/movie';

  const fetchMovies = async (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}?api_key=${apiKey}&query=${searchTerm}`);
      const data = await res.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 500), []);

  useEffect(() => {
    debouncedFetchMovies(query);
  }, [query, debouncedFetchMovies]);

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Redireciona para a página de detalhes do filme
  };

  return (
    <div className="home-background text-light main-div min-vh-100">
      <Navbar />
      <div className="container text-center mt-5">
        <img src={Logo} alt="Logo" className="logo" width="300" height="300" />
        <h1 className="display-4">My Bremer Box DB</h1>
        <p className="lead">Nunca se esqueça dos seus filmes e atores preferidos!</p>

        <div className="my-4">
          <form onSubmit={(e) => e.preventDefault()} className="d-flex justify-content-center">
            <input
              type="text"
              placeholder="Buscar filmes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control form-control-lg me-2"
              style={{ maxWidth: '450px' }}
            />
          </form>
        </div>

        {loading && <p>Carregando...</p>}

        <div className="mt-4">
          <h2>Resultados da busca:</h2>
          <div className="row mt-3">
            {searchResults.length > 0 ? (
              searchResults.map((movie, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex">
                  <button
                    onClick={() => handleCardClick(movie.id)} // Navegar para a página de detalhes
                    className="card h-100 bg-secondary text-light border-0 d-flex flex-column"
                    style={{
                      padding: 0,
                      cursor: 'pointer',
                      height: '400px',
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      className="card-img-top"
                      alt={movie.title}
                      style={{
                        height: '300px',
                        objectFit: 'cover',
                        width: '200px',
                        margin: '0 auto',
                      }}
                    />
                    <div
                      className="card-body d-flex flex-column"
                      style={{
                        flexGrow: 0,
                        height: '65px',
                        overflow: 'hidden',
                      }}
                    >
                      <h5
                        className="card-title"
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          height: '50px',
                        }}
                      >
                        {movie.title.length > 20 ? `${movie.title.slice(0, 17)}...` : movie.title}
                      </h5>
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhum filme encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;