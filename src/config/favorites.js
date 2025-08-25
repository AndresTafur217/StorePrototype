const BASE_URL = 'http://localhost:5000';

export const FAVORITES_ENDPOINTS = {
  addBM: `${BASE_URL}/api/favorites/add-favorite`,
  deleteBM: `${BASE_URL}/api/favorites/:id/delete-favorite`,
  getFavorites: `${BASE_URL}/api/favorites`,
}