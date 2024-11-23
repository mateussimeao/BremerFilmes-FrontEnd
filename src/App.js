import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Movie from './pages/movie/Movie';
import ActorPage from './pages/actor/ActorPage';
import UserProfile from './pages/userprofile/UserProfile';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext';
import NotFound from './pages/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DirectorPage from './pages/director/DirectorPage';
import MovieReview from './pages/review/MovieReview';
import MyReview from './pages/myreviews/MyReview';
import ProtectedRoute from './components/ProtectedRouter/ProtectedRouter';


function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <Movie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actor/:actorId"
            element={
              <ProtectedRoute>
                <ActorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/director/:directorId"
            element={
              <ProtectedRoute>
                <DirectorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/review/:movieId"
            element={
              <ProtectedRoute>
                <MovieReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myreview"
            element={
              <ProtectedRoute>
                <MyReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userprofile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </UserProvider>
    </Router>
  );
}

export default App;
