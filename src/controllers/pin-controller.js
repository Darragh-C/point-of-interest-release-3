import { db } from "../models/db.js";
import { TagSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const pinController = {
  index: {
    handler: async function (request, h) {
      const pinId = request.params.id;
      const loggedInUser = request.auth.credentials;
      console.log("Getting pin");
      const pin = await db.pinStore.getPinById(pinId);
      const viewData = {
        title: "Pin tags",
        user: loggedInUser,
        pin: pin,
      };
      console.log("Rendering pin view");
      return h.view("pin-view", viewData);
    },
  },

  updatePin: {
    validate: {
      payload: TagSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("pin-view", { title: "Pins error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const pinId = request.params.id;
      console.log("Getting pin");
      let pin = await db.pinStore.getPinById(pinId);
      let updatedPin = {
          description: request.payload.description,
          county: request.payload.county,
          lattitude: request.payload.lattitude,
          longitude: request.payload.longitude,
      };
      console.log("Updating pin tags");
      await db.pinStore.updatePin(pin, updatedPin);
      pin = await db.pinStore.getPinById(pinId);
      const viewData = {
          title: "Pin tags",
          pin: pin,
      };
      console.log("Rendering pin view");
      return h.view("pin-view", viewData);
    }
  },

  updatePinCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const pinId = request.params.id;
      let pin = await db.pinStore.getPinById(pinId);
      let updatedPin = {
          category: request.payload.category,
      };
      console.log("Updating pin category");
      await db.pinStore.updatePinCategory(pin, updatedPin);
      pin = await db.pinStore.getPinById(pinId);
      const viewData = {
          title: "Pin tags",
          pin: pin,
      };
      console.log("Rendering pin view");
      return h.view("pin-view", viewData);
    }
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const pin = await db.pinStore.getPinById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          pin.img = url;
          await db.pinStore.updateImage(pin);
        }
        return h.redirect(`/pin/${pin._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/pin/${pin._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

};