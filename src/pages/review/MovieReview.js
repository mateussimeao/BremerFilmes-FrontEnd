/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieReview.css';

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
*/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieReview.css";

const ReviewPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Simulando os detalhes do filme
    const mockMovie = {
      title: "Inception",
      rating: 8.8,
      poster_path: "C:\Users\cardo\OneDrive\Imagens.jpg",
      overview: "Um thriller de ficção científica que explora a mente humana através dos sonhos.",
    };
    setMovie(mockMovie);

    // Simulando as reviews dos usuários
    const mockReviews = [
      {
        user: "Usuário1",
        review: "Excelente filme! A história é muito envolvente e os efeitos visuais são incríveis.",
        rating: 9,
      },
      {
        user: "Usuário2",
        review: "Gostei muito, mas o final deixou algumas dúvidas. Ótima atuação dos atores.",
        rating: 8,
      },
    ];
    setReviews(mockReviews);
  }, [id]);

  return (
    <div className="review-page">
      <div className="movie-details">
        <img src={movie.poster_path} alt={`${movie.title} Poster`} />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p style={{ marginTop: '10px' }}>Nota: {movie.rating}/10</p>
          <p>{movie.overview}</p>
        </div>
      </div>
      
      <div className="reviews-section">
        <h2>Reviews dos Usuários</h2>
        {reviews.map((review, index) => (
          <div key={index} className="review">  
            <h3>{review.user}</h3>
            <p>{review.review}</p>
            <p>Nota: {review.rating}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
}  
export default ReviewPage;
