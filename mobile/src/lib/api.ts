import axios from "axios";

const PC_IP = '';

export const api = axios.create({
  baseURL: `http://${PC_IP}:3000`
});