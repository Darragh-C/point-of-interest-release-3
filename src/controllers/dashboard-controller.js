import { db } from "../models/db.js";
import { PinSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      console.log("Getting user pins");
      const pins = await db.pinStore.getUserPins(loggedInUser._id);
      const viewData = {
        title: "Point of Interest Dashboard",
        user: loggedInUser,
        pins: pins,
      };
      console.log("Rendering dashboard view");
      return h.view("dashboard-view", viewData);
    },
  },

  addPin: {
    validate: {
      payload: PinSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Pins error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPin = {
        userid: loggedInUser._id,
        name: request.payload.name,
        description: request.payload.description,
        lattitude: request.payload.lattitude,
        longitude: request.payload.longitude,
      };
      console.log("Adding new pin");
      await db.pinStore.addPin(newPin);
      console.log("Rendering dashboard view");
      return h.redirect("/dashboard");
    },
  },

  deletePin: {
    handler: async function (request, h) {
      const pin = await db.pinStore.getPinById(request.params.id);
      console.log("Deleting pin");
      await db.pinStore.deletePinById(pin._id);
      console.log("Rendering dashboard view");
      return h.redirect("/dashboard");   
    }
  }
};
