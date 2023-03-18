import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const poiService = {
  poiUrl: serviceUrl,
  //User API
  async createUser(user) {
    const res = await axios.post(`${this.poiUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.poiUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.playtimeUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

  //Pin API
  async createPin(pin) {
    const res = await axios.post(`${this.poiUrl}/api/pins`, pin);
    return res.data;
  },

  async getPin(id) {
    const res = await axios.get(`${this.poiUrl}/api/pins/${id}`);
    return res.data;
  },

  async getAllPins() {
    const res = await axios.get(`${this.poiUrl}/api/pins`);
    return res.data;
  },

  async deleteAllPins() {
    const res = await axios.delete(`${this.poiUrl}/api/pins`);
    return res.data;
  },
};
