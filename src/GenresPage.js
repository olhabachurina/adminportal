import React, { useEffect, useState } from 'react';
import { getAllGenres, deleteGenre } from '../services/GenreService';
import { Link } from 'react-router-dom';

const GenresPage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    const result = await getAllGenres();
    setGenres(result);
  };

  const handleDelete = async (id) => {
    await deleteGenre(id);
    loadGenres();
  };

  return (
    <div>
      <h1>Genres</h1>
      <Link to="/genres/add">Add New Genre</Link>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            {genre.name} 
            <button onClick={() => handleDelete(genre.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenresPage;