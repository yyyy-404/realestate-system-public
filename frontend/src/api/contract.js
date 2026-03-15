// src/api/contract.js
import request from "./request";

export const getContracts = () => request.get("/contract/");
export const createContract = (data) => request.post("/contract/", data);