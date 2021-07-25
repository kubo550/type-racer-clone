import axios from "axios";

const baseURL = "http://localhost:3000/api";

export const songApi = axios.create({ baseURL });
