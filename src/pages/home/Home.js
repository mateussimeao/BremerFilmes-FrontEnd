import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Home.css';

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
      
      // Limitar o número de filmes a 5
      const limitedResults = data.results.slice(0, 8);

      setSearchResults(limitedResults); 
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <Navbar />
      <p className="title-center">
        My Bremer Box DB
        <p className="slogan">Não se esqueça nunca quais seus filmes e atores preferidos</p>
      </p>

      <div className="home">
        {/* Barra de Pesquisa */}
        <div className="search-bar">
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Buscar filmes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Buscar</button>
          </form>
        </div>

        {loading && <p>Carregando...</p>} 

        <div className="search-results">
          <h2>Resultados da busca:</h2>
          <ul>
            {searchResults.length > 0 ? (
              searchResults.map((movie, index) => (
                <li key={index}>
                  <h3>{movie.title}</h3>
                  <div className="movie-overview">
                    <p>{movie.overview}</p>
                  </div>
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    style={{ width: '150px' }}
                  />
                </li>
              ))
            ) : (
              <p>Nenhum filme encontrado.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
