import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node"

const db = new Low(new JSONFile("./src/models/json/pins.json"));
db.data = { pins: [] };

export const pinJsonStore = {
    async getAllPins() {
      await db.read();
      return db.data.pins;
    },
  
    async addPin(pin) {
      await db.read();
      pin._id = v4();
      db.data.pins.push(pin);
      await db.write();
      return pin;
    },
  
    async getPinById(id) {
      await db.read();
      let p = db.data.pins.find((pin) => pin._id === id);
      if (p === undefined) p = null;
      return p;
    },
  
    async getUserPins(userid) {
      await db.read();
      return db.data.pins.filter((pin) => pin.userid === userid);
    },
  
    async deletePinById(id) {
      await db.read();
      const index = db.data.pins.findIndex((pin) => pin._id === id);
      if (index !== -1) db.data.pins.splice(index, 1);
      await db.write();
    },
  
    async deleteAllPins() {
      db.data.pins = [];
      await db.write();
    },

    async updatePin(pin, updatedPin) {
      if (updatedPin.description) {
        pin.description = updatedPin.description;
      }
      if (updatedPin.lattitude) {
        pin.lattitude = updatedPin.lattitude;
      }
      if (updatedPin.longitude) {
        pin.longitude = updatedPin.longitude;
      }
      
      await db.write();
    },
  };