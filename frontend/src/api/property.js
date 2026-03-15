// src/api/property.js
import request from "./request";

export const getProperties = (params) => request.get("/property/", { params });
export const getProperty = (id) => request.get(`/property/${id}`);
export const createProperty = (data) => request.post("/property/", data);
export const uploadImage = (formData) =>
  request.post("/property-image/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });