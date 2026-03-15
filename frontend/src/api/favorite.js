// src/api/favorite.js
import request from "./request";

export const addFavorite = (propertyId) =>
  request.post(`/favorite/${propertyId}`);
export const getFavorites = () => request.get(`/favorite/`);