import React from 'react';
import './Movie.css';


const Movie = () => {
  const movie = {
    title: 'Título do Filme',
    overview: 'Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história. Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.Aqui vai a sinopse do filme. É uma breve descrição sobre o enredo e principais pontos da história.',
    poster_path: '/caminho-para-imagem.jpg',
  };

  const cast = [
    { id: 1, name: 'Ator 1', character: 'Personagem 1', profile_path: '/caminho-para-ator1.jpg' },
    { id: 2, name: 'Ator 2', character: 'Personagem 2', profile_path: '/caminho-para-ator2.jpg' },
    { id: 3, name: 'Ator 3', character: 'Personagem 3', profile_path: '/caminho-para-ator3.jpg' },
  ];

  return (
    <div className="movie-container">
      <header className="site-header">
        <p id="site-name">MyBremerBoxDB</p>
      </header>

      <div className="movie-detail">
        <img src={movie.poster_path} alt={movie.title} className="movie-poster" />

        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>

      <div className="movie-cast">
        {cast.map(actor => (
          <div key={actor.id} className="cast-member">
            <img src={actor.profile_path} alt={actor.name} className="actor-photo" />
            <p className="actor-name">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
