import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './MyReview.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoPencil } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import UserContext from '../../context/UserContext';
import { toast } from 'react-toastify';
import Footer from '../../components/footer/Footer';
import { EditCommentReview, GetReviewsByUser, RemoveReview } from '../../services/Review';
const MyReview = () => {
  const [reviews, setReviews] = useState([]);
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const [loading, setLoading] = useState(false);
  const [idReview, setIdReview] = useState();
  const {user} = useContext(UserContext);
  useEffect( () => {
    const fetchData = async () => {
      
      // Espere pela atualização de `user` antes de tentar acessá-lo.
      if (user.id !== 0) {
          await fetchItems();
      }
  };

  fetchData();

  }, [user]);
  const fetchItems = async () => {
    setLoading(true);
    try {
        if(user.id !== 0){
          const reviewResponse = await GetReviewsByUser(user.id);
          setReviews(reviewResponse.dados);
        }
        
      } catch (error) {
        toast.error("Erro ao buscar itens:" + error, {position: 'top-left'})
      }finally{
        setLoading(false);
      }
    
  };



  
  const handleEdit = async () => {
    try {
        await EditCommentReview({comentario, id: idReview, nota});
        await fetchItems();

    } catch (error) {
        toast.error("Erro ao editar item:" + error, {position: 'top-left'})
    }
  }

  const handleDelete = async (id) => {
    try {
        await RemoveReview(id);
        await fetchItems();

    } catch (error) {
        toast.error("Erro ao remover item:" + error, {position: 'top-left'})
    }
  }

  

  if (!user || loading) {
    return <p>Carregando...</p>; // Mostra um fallback enquanto `user` é `undefined`
}

  return (
    <div className="user-profile-background text-light main-div min-vh-100">
      <Navbar />
      <div className="fundo-cor text-center mt-5 min-vh-100">
      
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
           
            <h2 className="profile-name">{user?.username || 'Nada aqui'}</h2>
            <p className="profile-description">{user?.descricao|| 'Nada aqui'}</p>
            <p className="profile-location">{user?.localizacao|| 'Nada aqui'}</p>
            
          </div>
          
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog ">
            <div className="modal-content edicao">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edite a sua review do filme !!</h1>
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
                <button type="button" onClick={handleEdit} data-bs-dismiss="modal" className="btn btn-light">Editar</button>
              </div>
            </div>
          </div>
        </div>


        {loading && <p>Carregando...</p>}
        
        
        <div className="reviews-section-review">
          <h2>Reviews dos Usuário</h2>
          {reviews.map((review, index) => (
            <div key={index} className="review-outro">
              <div className='review-content-right'>
                <h3>{review.user.username}</h3>
                <p>{review.comentario}</p>
                <p>Nota: {review.nota}/10</p>
                <p >Curtidas: {review.curtidas}</p>
              </div>
              <div className='review-content-left'>
                <button 
                    type='button'
                    className="btn btn-light d-flex align-items-center justify-content-center"
                    onClick={() => setIdReview(review.id)}
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    style={{ width: '42px', height: '38px' }}
                    >
                  <GoPencil style={{ fontSize: '28px', color: '#000' }} />
                </button>
                <button 
                    type='button'
                    className="btn btn-light d-flex align-items-center justify-content-center"
                    onClick={() => handleDelete(review.id)}
                    style={{ width: '42px', height: '38px' }}
                    >
                  <FaTrash style={{ fontSize: '28px', color: '#000' }} />
                </button>
              </div>
              
              
            </div>
          ))}
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default MyReview;
