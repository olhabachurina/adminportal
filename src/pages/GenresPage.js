import React, { useEffect, useState } from 'react';
import { addGenre, getAllGenres, updateGenre, deleteGenre } from '../services/GenreService'; // Правильный импорт функций
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GenresPage = () => {
  const [genres, setGenres] = useState([]); // Список жанров
  const [formData, setFormData] = useState({
    name: '', // Только поле name, без genreId
  });
  const [editingGenreId, setEditingGenreId] = useState(null);

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    console.log('Loading genres...');
    try {
      const result = await getAllGenres();
      console.log('Genres loaded:', result);
      setGenres(result);
    } catch (error) {
      console.error('Error fetching genres:', error);
      toast.error('Error loading genres');
    }
  };

  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Form submitted:', formData);
  
    if (!formData.name) {
      toast.error('Genre name is required!');
      return;
    }
  
    try {
      if (editingGenreId) {
        // Обновление жанра
        await updateGenre(editingGenreId, { genreId: editingGenreId, name: formData.name }); // Передаем genreId и name
        toast.success('Genre updated successfully!');
        console.log('Genre updated:', editingGenreId);
      } else {
        // Добавление нового жанра (без genreId)
        await addGenre({ name: formData.name });
        toast.success('Genre added successfully!');
        console.log('Genre created');
      }
      loadGenres();
      clearForm();
    } catch (error) {
      console.error('Error creating/updating genre:', error);
      toast.error('Error creating/updating genre');
    }
  };

  const handleEdit = (genre) => {
    console.log('Editing genre:', genre);
    setEditingGenreId(genre.genreId);
    setFormData({
      name: genre.name, // Только поле name
    });
  };

  const handleDelete = async (genreId) => {
    console.log('Deleting genre:', genreId);
    try {
      await deleteGenre(genreId);
      toast.success('Genre deleted successfully!');
      loadGenres();
    } catch (error) {
      console.error('Error deleting genre:', error);
      toast.error('Error deleting genre');
    }
  };

  const clearForm = () => {
    console.log('Clearing form');
    setFormData({
      name: '', // Только поле name
    });
    setEditingGenreId(null);
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Genres</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Genre Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </div>

        <button type="submit">{editingGenreId ? 'Update Genre' : 'Add Genre'}</button>
      </form>

      <ul>
        {genres.map((genre) => (
          <li key={genre.genreId}>
            {genre.name} <br />
            <button onClick={() => handleEdit(genre)}>Edit</button>
            <button onClick={() => handleDelete(genre.genreId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenresPage;