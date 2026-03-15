// src/api/stats.js
import request from "./request";

export const getStats = () => request.get("/stats/");