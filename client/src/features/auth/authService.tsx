import axios from 'axios';

interface UserRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

interface UserLogin {
  username: string;
  password: string;
}

const register = async (userData: UserRegister) => {
  const response = await axios.post('/api/auth/register', userData);

  // create front end error message about username or email already in use
  if (response.status === 409) {
    return 'registerError';
  }
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: UserLogin) => {
  const response = await axios.post('/api/auth/login', userData);

  // create front end error message about bad username and login combination
  if (response.status === 409) {
    return 'loginError';
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
