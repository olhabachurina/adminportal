import axios from 'axios';

const API_URL = 'https://localhost:7005/api/genres';

// Получить все жанры
export const getAllGenres = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Добавить новый жанр
export const addGenre = async (genre) => {
  try {
    await axios.post(API_URL, genre, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error adding genre:', error);
    throw error;
  }
};

// Обновить жанр
export const updateGenre = async (id, genre) => {
  try {
    await axios.put(`${API_URL}/${id}`, genre, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(`Error updating genre with ID ${id}:`, error);
    throw error;
  }
};

// Удалить жанр
export const deleteGenre = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting genre with ID ${id}:`, error);
    throw error;
  }
};