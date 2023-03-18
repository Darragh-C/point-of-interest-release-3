import { db } from "../models/db.js";

export const aboutController = {
  index: {
    handler: async function (request, h) {
      const viewData = {
        title: "About Point of Interest",
      };
      console.log("Rendering about view");
      return h.view("about-view", viewData);
    },
  },
};