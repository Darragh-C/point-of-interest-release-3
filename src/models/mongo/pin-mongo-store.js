import { Pin } from "./pin.js";
import mongoose from 'mongoose';

export const pinMongoStore = {
    async getAllPins() {
      const pins = await Pin.find().lean();
      return pins;
    },

    async getAllPinsSort(key) {
      const pins = await Pin.find().sort( { [key] : 1 } ).lean();
      return pins;
    },

    async getPinsTotal() {
      const pins = await Pin.find().count().lean();
      return pins;
    },
  
    async getPinById(id) {
      if (id) {
        const pin = await Pin.findOne({ _id: id }).lean();
        if (pin) {
          return pin;
        } else {
          return null;  
        }
      }
      return null;
    },

    async getPinCategory(id) {
      const pin = await Pin.findOne({ _id: id}).lean();
      return pin.category;
    },

    async getPinsCategories() {
      let categories = [];
      let pins = await this.getAllPins();
      for (let i = 0; i < pins.length; i += 1) {
        if (!categories.includes(pins[i].category)) {
          categories.push(pins[i].category);
        }
      }
      return categories;
    },

    async getPinsByCategory(category) {
      const pins = Pin.find({ category: category }).lean();
      return pins;
    },

    async groupPinsByCategory(userId) {
      let pins = Pin.aggregate([
        { $match: {
            userid: userId
          }   
        },
        { $group: { 
          _id: "$category", pins: { 
            $push: { 
              _id: "$_id", 
              userid: "$userid", 
              name: "$name", 
              category: "$category", 
              description: "$description", 
              lattitude: "lattitude", 
              longitute: "$longitude", 
              __v: "$__v" } 
            } 
          } 
        },
        { $sort: { _id: 1 } },
      ]);
      return pins;
    },

    async groupPinsByTown(userId) {
      let pins = Pin.aggregate([
        { $match: {
            userid: userId
          }   
        },
        { $group: { 
          _id: "$name", pins: { 
            $push: { 
              _id: "$_id", 
              userid: "$userid", 
              name: "$name", 
              category: "$category", 
              description: "$description", 
              lattitude: "lattitude", 
              longitute: "$longitude", 
              __v: "$__v" } 
            } 
          } 
        },
        { $sort: { _id: 1 } },
      ]);
      return pins;
    },

    async groupPinsByCounty(userId) {
      let pins = Pin.aggregate([
        { $match: {
            userid: userId
          }   
        },
        { $group: { 
          _id: "$county", pins: { 
            $push: { 
              _id: "$_id", 
              userid: "$userid", 
              name: "$name", 
              category: "$category", 
              description: "$description", 
              county: "$county", 
              lattitude: "lattitude", 
              longitute: "$longitude", 
              __v: "$__v" } 
            } 
          } 
        },
        { $sort: { _id: 1 } },
      ]);
      return pins;
    },

    async pinsCategoryCount(category) {
      const group = "$" + category;
      let pins = Pin.aggregate([
        { $group: { 
          _id: group, pins: { 
            $push: { 
              _id: "$_id", 
              userid: "$userid", 
              name: "$name", 
              category: "$category", 
              description: "$description", 
              lattitude: "lattitude", 
              longitute: "$longitude", 
              __v: "$__v" } 
            } 
          } 
        },
        { $project: { _id: 1, count: { $size: "$pins" } } }
      ]);
      return pins;
    },

    async getUserPins(userId) {
      const pins = Pin.find({ userid: userId }).lean();
      return pins;
    },
  
    async addPin(pin) {
      //console.log("creating pin schema");
      const newPin = new Pin(pin);
      //console.log(newPin);
      //console.log("creating pin object");
      const pinObj = await newPin.save();
      //console.log(pinObj);
      //console.log("gettign pin by id");
      const p = await this.getPinById(pinObj._id);
      //console.log(p);
      return p;
    },
   
    async deletePinById(id) {
      try {
        await Pin.deleteOne({ _id: id });
      } catch (error) {
        console.log("bad id");
      }
    },
  
    async deleteAll() {
      await Pin.deleteMany({});
    },
  
    async updatePin(pin, updatedPin) {
      //const dbPin = await Pin.findOne({ _id: pin._id }).lean();
      if (updatedPin.description !== null && updatedPin.description !== undefined && updatedPin.description !== "") {
        console.log("updating description");
        Pin.updateOne(
          { _id: pin._id },
          { description: updatedPin.description}
        )
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
      }  
      if (updatedPin.lattitude !== null && updatedPin.lattitude !== undefined && updatedPin.lattitude !== "") {
        Pin.updateOne(
          { _id: pin._id },
          { lattitude: updatedPin.lattitude}
        )
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
      }  
      if (updatedPin.longitude !== null && updatedPin.longitude !== undefined && updatedPin.longitude !== "") {
        Pin.updateOne(
          { _id: pin._id },
          { longitude: updatedPin.longitude}
        )
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
      }  
      if (updatedPin.county !== null && updatedPin.county !== undefined && updatedPin.county !== "") {
        Pin.updateOne(
          { _id: pin._id },
          { county: updatedPin.county}
        )
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
      }  

    },  

    async updatePinCategory(pin, updatedPin) {
      const dbPin = await Pin.findOne({ _id: pin._id }).lean();
      if (updatedPin.category !== null) {
        Pin.updateOne(
          { _id: pin._id },
          { category: updatedPin.category },
          { new: true }
        )
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
      }  
    },  

    async updateImage(updatedPin) {
      const pin = await Pin.findOne({ _id: updatedPin._id });
      pin.img = updatedPin.img;
      await pin.save();
    },
  };  