import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '45eb858eef4393990a83b95485543080';
  const apiUrl = 'https://api.themoviedb.org/3/search/movie';

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}?api_key=${apiKey}&query=${query}`);
      const data = await res.json();
      const limitedResults = data.results.slice(0, 4);
      setSearchResults(limitedResults);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-background text-light min-vh-100">
      <Navbar />
      <div className="container text-center mt-5">
        <h1 className="display-4">My Bremer Box DB</h1>
        <p className="lead">Não se esqueça nunca quais seus filmes e atores preferidos</p>

        <div className="my-4">
          <form onSubmit={handleSearch} className="d-flex justify-content-center">
            <input
              type="text"
              placeholder="Buscar filmes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control form-control-lg me-2"
              style={{ maxWidth: '450px' }}
            />
            <button type="submit" className="btn btn-primary btn-lg w-25" style={{maxWidth:'200px'}}>Buscar</button>
          </form>
        </div>

        {loading && <p>Carregando...</p>}

        <div className="mt-4">
          <h2>Resultados da busca:</h2>
          <div className="row mt-3">
            {searchResults.length > 0 ? (
              searchResults.map((movie, index) => (
                <div key={index} className="col-md-3 col-sm-6 mb-4">
                  <div className="card h-100 bg-secondary text-light">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="card-img-top"
                      alt={movie.title}
                      style={{ maxHeight: '300px', objectFit: 'contain', width: '100%', marginTop: '10px' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text movie-overview" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                        {movie.overview}
                      </p>
                    </div>
                  </div>
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
