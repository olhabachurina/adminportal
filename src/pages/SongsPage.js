import React, { useEffect, useState } from 'react';
import { getAllSongs, createSong, updateSong } from '../services/SongService';
import { getAllUsers } from '../services/UserService'; 
import { getAllGenres } from '../services/GenreService'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SongsPage.css'; 

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [musicPreview, setMusicPreview] = useState(null); 
  const [videoPreview, setVideoPreview] = useState(null); 
  const [formData, setFormData] = useState({
    songId: '',
    title: '',
    artist: '',
    genreId: '',
    mood: '',
    userId: '',
    userName: '',
    musicFile: null,
    videoFile: null,
    musicFilePath: '',
    videoFilePath: '',
    videoUrl: ''
  });
  const [editingSongId, setEditingSongId] = useState(null);

  useEffect(() => {
    loadSongs();
    loadUsers();
    loadGenres();
  }, []);

  const loadSongs = async () => {
    console.log('Loading songs...');
    try {
      const result = await getAllSongs();
      console.log('Songs loaded:', result);
      setSongs(result);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const loadUsers = async () => {
    console.log('Loading users...');
    try {
      const result = await getAllUsers();
      console.log('Users loaded:', result);
      setUsers(result);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const loadGenres = async () => {
    console.log('Loading genres...');
    try {
      const result = await getAllGenres();
      console.log('Genres loaded:', result);
      setGenres(result);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleInputChange = (e) => {
    console.log(`Input changed: ${e.target.name}, value: ${e.target.value}`);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      console.log(`File selected: ${file.name}`);
      if (e.target.name === 'musicFile') {
        setFormData({ ...formData, musicFile: file });
        setMusicPreview(fileURL);
      } else if (e.target.name === 'videoFile') {
        setFormData({ ...formData, videoFile: file });
        setVideoPreview(fileURL);
        setFormData({ ...formData, videoUrl: fileURL }); // Генерация URL для видео
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const musicFile = formData.musicFile;
    const videoFile = formData.videoFile;
  
    if (!musicFile) {
      toast.error('Music file is required!');
      return;
    }
  
    if (!videoFile) {
      toast.error('Video file is required!');
      return;
    }
    formDataToSend.forEach((value, key) => {
      console.log(key, value);
    });
    const formDataToSend = new FormData();
    formDataToSend.append('songId', editingSongId || formData.songId);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('artist', formData.artist);
    formDataToSend.append('genreId', parseInt(formData.genreId, 10));
    formDataToSend.append('mood', formData.mood);
    formDataToSend.append('userId', parseInt(formData.userId, 10));
    formDataToSend.append('userName', formData.userName);
    formDataToSend.append('musicFile', musicFile);
    formDataToSend.append('videoFile', videoFile);
  
    console.log('FormData to be sent:', {
      songId: editingSongId || formData.songId,
      title: formData.title,
      artist: formData.artist,
      genreId: formData.genreId,
      mood: formData.mood,
      userId: formData.userId,
      userName: formData.userName,
      musicFile: musicFile.name,
      videoFile: videoFile.name,
    });
  
    try {
      const response = editingSongId
        ? await updateSong(editingSongId, formDataToSend)
        : await createSong(formDataToSend);
      toast.success('Song added/updated successfully!');
      loadSongs();
      clearForm();
    } catch (error) {
      console.error('Error creating/updating song:', error.response ? error.response.data : error.message);
      toast.error('Error creating/updating song.');
    }
  };

  const handleEdit = (song) => {
    console.log('Editing song:', song);
    setEditingSongId(song.songId);
    setFormData({
      songId: song.songId,
      title: song.title,
      artist: song.artist,
      genreId: song.genreId,
      mood: song.mood,
      userId: song.userId,
      userName: song.userName,
      musicFile: null,
      videoFile: null,
      musicFilePath: song.musicFilePath,
      videoFilePath: song.videoFilePath,
      videoUrl: song.videoUrl
    });
  };

  const clearForm = () => {
    console.log('Clearing form');
    setFormData({
      songId: '',
      title: '',
      artist: '',
      genreId: '',
      mood: '',
      userId: '',
      userName: '',
      musicFile: null,
      videoFile: null,
      musicFilePath: '',
      videoFilePath: '',
      videoUrl: ''
    });
    setMusicPreview(null);
    setVideoPreview(null);
    setEditingSongId(null);
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Songs</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="artist">Artist:</label>
          <input type="text" id="artist" name="artist" value={formData.artist} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <select id="genre" name="genreId" value={formData.genreId} onChange={handleInputChange}>
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.genreId} value={genre.genreId}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="mood">Mood:</label>
          <input type="text" id="mood" name="mood" value={formData.mood} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="musicFile">Music File:</label>
          <input type="file" id="musicFile" name="musicFile" onChange={handleFileChange} />
          {musicPreview && <audio controls src={musicPreview}></audio>}
        </div>
        <div>
          <label htmlFor="videoFile">Video File:</label>
          <input type="file" id="videoFile" name="videoFile" onChange={handleFileChange} />
          {videoPreview && <video controls src={videoPreview}></video>}
        </div>
        <div>
          <label htmlFor="user">User:</label>
          <select
            id="user"
            name="userId"
            value={formData.userId}
            onChange={(e) => {
              const selectedUser = users.find((user) => user.userId === parseInt(e.target.value));
              setFormData({ ...formData, userId: e.target.value, userName: selectedUser?.userName || '' });
              console.log(`User selected: id=${e.target.value}, name=${selectedUser?.userName}`);
            }}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.userName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{editingSongId ? 'Update Song' : 'Add Song'}</button>
      </form>

      <ul>
        {songs.map((song) => (
          <li key={song.songId}>
            {song.title} - {song.artist} ({song.genre}) <br />
            Mood: {song.mood} <br />
            <audio controls src={`/${song.musicFilePath}`}></audio>
            <video controls src={`/${song.videoFilePath}`}></video>
            <br />
            <button onClick={() => handleEdit(song)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsPage;