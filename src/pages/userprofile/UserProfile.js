import React, { useState, useCallback } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './UserProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { debounce } from 'lodash';

const UserProfile = () => {
  const [favorites, setFavorites] = useState({
    movies: [],
    actors: [],
    directors: [],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('movies');
  const [loading, setLoading] = useState(false);

  const apiKey = '45eb858eef4393990a83b95485543080';
  const apiUrl = 'https://api.themoviedb.org/3';

  const fetchItems = async (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    let endpoint = '';

    switch (category) {
      case 'movies':
        endpoint = `${apiUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}`;
        break;
      case 'actors':
      case 'directors':
        endpoint = `${apiUrl}/search/person?api_key=${apiKey}&query=${searchTerm}`;
        break;
      default:
        return;
    }

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchItems = useCallback(debounce(fetchItems, 500), [category]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    debouncedFetchItems(e.target.value);
  };

  const handleAddFavorite = (item) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [category]: [...prevFavorites[category], item],
    }));
    setInputValue('');
    setSearchResults([]);
  };

  const handleRemoveFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [category]: prevFavorites[category].filter(item => item.id !== id),
    }));
  };

  return (
    <div className="user-profile-background text-light main-div min-vh-100">
      <Navbar />
      <div className="container text-center mt-5">
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
            <h2 className="profile-name">Brune Galvã ✨</h2>
            <p className="profile-description">Adoro David Lynch 💋</p>
            <p className="profile-location">📍 India</p>
            <div className="profile-stats">
              <div className="stat">
                <h3>213</h3>
                <p>FILMS</p>
              </div>
              <div className="stat">
                <h3>17</h3>
                <p>FOLLOWING</p>
              </div>
              <div className="stat">
                <h3>133</h3>
                <p>FOLLOWERS</p>
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
          <input
            type="text"
            placeholder={`Buscar ${category === 'movies' ? 'filme' : category === 'actors' ? 'ator' : 'diretor'}...`}
            value={inputValue}
            onChange={handleSearchChange}
            className="form-control form-control-lg mb-3"
            style={{ maxWidth: '450px', margin: '0 auto' }}
          />
        </div>

        {loading && <p>Carregando...</p>}

        <div className="search-results">
          {searchResults.map((item, index) => (
            <div
              key={index}
              className="search-result-item bg-secondary text-light mb-2 p-2"
              style={{ cursor: 'pointer' }}
              onClick={() => handleAddFavorite(item)}
            >
              {category === 'movies' ? item.title : item.name}
            </div>
          ))}
        </div>

        <div className="favorites-container mt-4">
          {/* Favoritos com Imagens */}
          <h2>{category === 'movies' ? 'Filmes Favoritos:' : category === 'actors' ? 'Atores Favoritos:' : 'Diretores Favoritos:'}</h2>
          <div className="favorites-list">
            {favorites[category].slice(0, 5).map((item, index) => (
              <div key={index} className="card h-100 bg-secondary text-light border-0 d-flex flex-column position-relative">
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path || item.profile_path}`}
                  className="card-img-top"
                  alt={item.title || item.name}
                  style={{
                    height: '300px',
                    objectFit: 'cover',
                  }}
                />
                <button
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFavorite(item.id)}
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
                    {item.title || item.name}
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
