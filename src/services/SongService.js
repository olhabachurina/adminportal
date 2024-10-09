import axios from 'axios';

const API_URL = 'https://localhost:7005/api/songs';

// Fetch all songs
export const getAllSongs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all songs:', error);
    throw error;
  }
};

// Fetch song by ID
export const getSongById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching song with ID ${id}:`, error);
    throw error;
  }
};

// Create a new song
export const createSong = async (songData) => {
  const formData = new FormData();
  formData.append('title', songData.title);
  formData.append('artist', songData.artist);
  formData.append('genreId', songData.genreId);
  formData.append('mood', songData.mood || '');
  formData.append('userId', songData.userId);
  formData.append('userName', songData.userName);

  if (songData.musicFile) {
    formData.append('MusicFile', songData.musicFile);
  }

  if (songData.videoFile) {
    formData.append('VideoFile', songData.videoFile);
  }

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating song:', error);
    throw error;
  }
};

// Update an existing song
export const updateSong = async (id, songData) => {
  const formData = new FormData();
  formData.append('songId', songData.songId);
  formData.append('title', songData.title);
  formData.append('artist', songData.artist);
  formData.append('genreId', songData.genreId);
  formData.append('mood', songData.mood || '');
  formData.append('userId', songData.userId);
  formData.append('userName', songData.userName);

  if (songData.musicFile) {
    formData.append('MusicFile', songData.musicFile);
  }

  if (songData.videoFile) {
    formData.append('VideoFile', songData.videoFile);
  }

  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating song with ID ${id}:`, error);
    throw error;
  }
};

// Delete a song
export const deleteSong = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting song with ID ${id}:`, error);
    throw error;
  }
};