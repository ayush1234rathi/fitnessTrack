import axios from 'axios';

const authService = {
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  },

  register: async (userData) => {
    try {

      const response = await axios.post(`http://localhost:8000/api/v1/users/register`, userData);
      
      const token = response.data.data?.accessToken;
      if (token) {
        authService.setAuthToken(token);
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/users/login`, credentials);
      
      const token = response.data.data?.accessToken;
      if (token) {
        authService.setAuthToken(token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data);
      throw error.response?.data?.message || 'Login failed';
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        await axios.post(`http://localhost:8000/api/v1/users/logout`, {}, config);
      }
      authService.setAuthToken(null);
    } catch (error) {
      console.error('Logout error:', error);
      
      authService.setAuthToken(null);
    }
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;