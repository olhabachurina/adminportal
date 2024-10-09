import React, { useEffect, useState } from 'react';
import { getAllUsers, createUser, deleteUser } from '../services/UserService'; // Добавлен импорт createUser
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    isActive: true,
    isApproved: true,
    role: 'User',
  }); // Данные для формы добавления пользователя

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllUsers();
      setUsers(result);
    } catch (err) {
      setError('Failed to load users.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToCreate = {
      ...formData,
      isActive: true, // Параметр isActive по умолчанию
      isApproved: true, // Параметр isApproved по умолчанию
    };

    try {
      await createUser(userToCreate);
      toast.success('User added successfully!');
      loadUsers(); // Перезагрузка списка пользователей
      clearForm(); // Очистка формы после успешного добавления
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Error adding user.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.userId !== id)); // Удаление пользователя из состояния
      toast.success('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user.');
    }
  };

  const clearForm = () => {
    setFormData({
      userName: '',
      email: '',
      password: '',
      isActive: true,
      isApproved: true,
      role: 'User',
    });
  };

  return (
    <div>
      <ToastContainer />
      <h1>Users</h1>

      {/* Форма для добавления нового пользователя */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <div>
          <label>Role:</label>
          <input type="text" name="role" value={formData.role} onChange={handleInputChange} />
        </div>
        <button type="submit">Add User</button>
      </form>

      {/* Список пользователей */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.userId}>
              {user.userName} ({user.email})
              <button onClick={() => handleDelete(user.userId)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;