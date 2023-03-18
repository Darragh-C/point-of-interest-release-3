import { v4 } from "uuid";

let pins = [];

export const pinMemStore = {
  async getAllPins() {
    return pins;
  },

  async addPin(pin) {
    pin._id = v4();
    pins.push(pin);
    return pin;
  },

  async getPinById(id) {
    return pins.find((pin) => pin._id === id);
  },

  async deletePinById(id) {
    const index = pins.findIndex((pin) => pin._id === id);
    pins.splice(index, 1);
  },

  async deleteAllPins() {
    pins = [];
  },

  async getUserPins(userid) {
    return pins.filter((pin) => pin.userid === userid);
  },
};