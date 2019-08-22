import api from './api'

export const TOKEN_KEY = "biology";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = api.get(`/user?token=${getToken()}`)

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
