import { db } from "../models/db.js";
import { TagsSpec } from "../models/joi-schemas.js";

export const pinController = {
    index: {
      handler: async function (request, h) {
        const pinId = request.params.id;
        const loggedInUser = request.auth.credentials;
        console.log("Getting pins");
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
    }
};