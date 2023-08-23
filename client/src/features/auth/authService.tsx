import axios from 'axios';

const API_URL = '/api/users/';

interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

interface UserLogin {
  username: string;
  password: string;
}

const register = async (userData: User) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: UserLogin) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
