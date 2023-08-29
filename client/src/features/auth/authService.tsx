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

  // create front end error message about username or email already in use
  if (response.status === 409) {
    return 'registerError'
  }
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: UserLogin) => {
  const response = await axios.post(API_URL, userData);

  // create front end error message about bad username and login combination
  if (response.status === 409) {
    return 'loginError'
  }
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
