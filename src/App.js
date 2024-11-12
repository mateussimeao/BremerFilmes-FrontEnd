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

function App() {
  return (
    
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={IsAutenticated() ? <Home />: <Login />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/actor/:actorId" element={<ActorPage />} />
            <Route path="/userprofile" element={<UserProfile />} /> {/* Adiciona a rota para UserProfile */}
          </Routes>
        </UserProvider>
      </Router>
    
  );
}

export default App;
