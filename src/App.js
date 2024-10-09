import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import GenresPage from './pages/GenresPage';
import SongsPage from './pages/SongsPage';
import UsersPage from './pages/UsersPage';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Маршрут по умолчанию, перенаправляющий на /genres */}
        <Route path="/" element={<Navigate to="/genres" />} />
        
        {/* Основные маршруты */}
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/users" element={<UsersPage />} />

        {/* Перенаправление на страницу 404 при отсутствии совпадений маршрута */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;