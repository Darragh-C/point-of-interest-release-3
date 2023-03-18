import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const pinApi = {
    create: {
      auth: false,
      handler: async function(request, h) {
        try {
          const pin = await db.pinStore.addPin(request.payload);
          if (pin) {
            return h.response(pin).code(201);
          }
          return Boom.badImplementation("error creating pin");
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
      tags: ["api"],
      description: "Create pin",
      notes: "Creates a pin with the pinApi",
    },
  
    find: {
      auth: false,
      handler: async function(request, h) {
        try {
          const pins = await db.pinStore.getAllPins();
          return pins;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
      tags: ["api"],
      description: "Get pins",
      notes: "Gets alls pins with the pinApi",
    },

    findOne: {
      auth: false,
      handler: async function (request, h) {
        try {
          const pin = await db.pinStore.getPinById(request.params.id);
          if (!pin) {
            return Boom.notFound("No Pin with this id");
          }
          return pin;
        } catch (err) {
          return Boom.serverUnavailable("No Pin with this id");
        }
      },
      tags: ["api"],
      description: "Get user",
      notes: "Gets a pin with the pinApi when you pass its id",
    },
    
    deleteAll: {
      auth: false,
      handler: async function (request, h) {
          try {
          await db.pinStore.deleteAll();
          return h.response().code(204);
          } catch (err) {
          return Boom.serverUnavailable("Database Error");
          }
      },
      tags: ["api"],
      description: "Delete pins",
      notes: "Deletes all pins with the pinApi",
    },  
  };