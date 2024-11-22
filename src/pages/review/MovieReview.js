import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieReview.css';
import Navbar from '../../components/navbar/Navbar';


const MovieReview = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Carregar detalhes do filme
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}`);
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Erro ao carregar detalhes do filme:", error);
      }
    };

    // Carregar reviews do filme
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Erro ao carregar reviews:", error);
      }
    };

    fetchMovieDetails();
    fetchReviews();
  }, [movieId]);

  if (!movieDetails) return <p>Carregando...</p>;

  return (
    <div className="movie-review-container">
      <Navbar />
      <div className="movie-poster">
        <img src={movieDetails.posterUrl} alt={`${movieDetails.title} poster`} />
      </div>
      <div className="review-content">
        <h2>Reviews dos Usuários</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h3>{review.userName}</h3>
              <p>{review.comment}</p>
              <p>Nota: {review.rating}/10</p>
            </div>
          ))
        ) : (
          <p>Nenhuma review encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default MovieReview;