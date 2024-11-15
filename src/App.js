import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Movie from './pages/movie/Movie';
import ActorPage from './pages/actor/ActorPage';
import UserProfile from './pages/userprofile/UserProfile'; // Importa o UserProfile
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext';
import { IsAutenticated } from './services/User';
import NotFound from './pages/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={IsAutenticated() ? <Home />: <Login />} />
            <Route path="/movie/:id" element={IsAutenticated() ? <Movie /> : <Login />} />
            <Route path="/actor/:actorId" element={IsAutenticated() ? <ActorPage /> : <Login />} />
            <Route path="/userprofile" element={IsAutenticated() ? <UserProfile /> : <Login />} /> {/* Adiciona a rota para UserProfile */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </UserProvider>
      </Router>
    
  );
}

export default App;
