import { db } from "../models/db.js";
import { PinSpec } from "../models/joi-schemas.js";

export const categoriesController = {
  index: {
    handler: async function (request, h) {
      const id = request.auth.credentials._id.toString();
      console.log("Grouping pins by category");
      const categories = await db.pinStore.groupPinsByCategory(id);
      
      const viewData = {
        title: "Categories",
        categories: categories,
      };
      return h.view("categories-view", viewData);
    },
  },

  filter: {
    handler: async function (request, h) {
      const id = request.auth.credentials._id.toString();
      let categories = {};
      if (request.payload.filter && request.payload.filter === "Placename") {
        console.log("Grouping pins by placename");
        categories = await db.pinStore.groupPinsByTown(id);
      } else if (request.payload.filter && request.payload.filter === "County") {
        console.log("Grouping pins by county");
        categories = await db.pinStore.groupPinsByCounty(id);
      } else {
        console.log("Grouping pins by category");
        categories = await db.pinStore.groupPinsByCategory();
      }
      
      const viewData = {
        title: "Categories",
        categories: categories,
      };
      console.log("Rendering categories view");
      return h.view("categories-view", viewData);
    },
  }

};
