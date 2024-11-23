import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './MovieReview.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useParams } from 'react-router-dom';
import { GoPencil } from 'react-icons/go';

import { AiFillLike } from "react-icons/ai";
import UserContext from '../../context/UserContext';
import { AddReview, GetReviewsByFilmeId, Like } from '../../services/Review';
import { toast } from 'react-toastify';
const MovieReview = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const {user} = useContext(UserContext);
  const apiKey = '45eb858eef4393990a83b95485543080';
  
  useEffect(() => {
    // Carregar detalhes do filme
    const fetchMovieDetails = async () => {
      try {
        if(user.id !== 0){
          const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`);
          const movieData = await movieResponse.json();
          setMovieDetails(movieData);
          
        }
        
      } catch (error) {
        toast.error("Erro ao buscar itens:" + error, {position: 'top-left'})
      }
    };

    // Carregar reviews do filme
    const fetchReviews = async () => {
      try {
        if(user.id !== 0){
          const reviewResponse = await GetReviewsByFilmeId(movieId);
          setReviews(reviewResponse.dados);
        }
        
      } catch (error) {
        toast.error("Erro ao buscar itens:" + error, {position: 'top-left'})
      }
    }
      

    fetchMovieDetails();
    fetchReviews();
  }, [user]);

  const handleCreateReview = async () => {
    try{
      await AddReview({idFilmeTMDB: movieId, idUsuario: user.id, comentario, nota});
      const reviewResponse = await GetReviewsByFilmeId(movieId);
      setReviews(reviewResponse.dados);
      toast.success("Review criada com sucesso", {position: 'top-left'})
    }catch(error){
      toast.error("Nao foi possível criar a review: " + error, {position: 'top-left'})
    }
  }

  const handleLike = async (id) => {
    try{
      await Like(id);
      const reviewResponse = await GetReviewsByFilmeId(movieId);
      setReviews(reviewResponse.dados);
      toast.success("Deu Like!", {position: 'top-left'})
    }catch(error){
      toast.error("Nao foi possível dar o like: " + error, {position: 'top-left'})
    }
  }

  if (!movieDetails) return <p>Carregando...</p>;

  return (
    <div className='main-div'>
      <Navbar />
      <div className="review-page">
            
        <div className="movie-details">
          <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  className="img-fluid rounded" />
          <div className="movie-info">
            <h1>{movieDetails.title}</h1>
            <p style={{ marginTop: '10px' }}>Nota: {movieDetails.vote_average}/10</p>
            <p>{movieDetails.overview}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <button 
                  
                  className="btn btn-light d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal" data-bs-target="#exampleModal"
                  style={{ width: '42px', height: '38px' }}
                >
                  <GoPencil style={{ fontSize: '28px', color: '#000' }} />
                </button>
              </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog ">
            <div className="modal-content edicao">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Deixe a sua review do filme !!</h1>
              </div>
              <div className="modal-body">
              <form >
                <div className="form-group">
                  <label>Comentário</label>
                  <input
                    type="text"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    required
                    placeholder="Escreva aqui a sua review"
                  />
                </div>
                <div className="form-group">
                  <label>Nota</label>
                  <input
                    type="number"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    required
                    placeholder="Escreva aqui a sua nota para esse filme"
                  />
                </div> 
              </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" onClick={handleCreateReview} data-bs-dismiss="modal" className="btn btn-light">Adicionar</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="reviews-section">
          <h2>Reviews dos Usuários</h2>
          {reviews.map((review, index) => (
            <div key={index} className="review">
              
              <h3>{review.user.username}</h3>
              <p>{review.comentario}</p>
              <p>Nota: {review.nota}/10</p>
              <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                    <button 
                      onClick={() => handleLike(review.id)}
                      className="btn btn-light d-flex align-items-center justify-content-center"
                      style={{ width: '42px', height: '38px' }}
                    >
                      <AiFillLike style={{ fontSize: '28px', color: '#000' }} />
                    </button>
                    <p className='mx-2'>Curtidas: {review.curtidas}</p>
                  </div>
              </div>
            </div>
          ))}
        </div>
            
      </div>
      <Footer />
    </div>
    
  );
};

export default MovieReview;