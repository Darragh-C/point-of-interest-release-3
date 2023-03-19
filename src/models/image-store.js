import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: "dhouhm9vg",
  api_key: "627463315664918",
  api_secret: "-HaVwu7ziwrrStgU2KjBUKsEzg0"
};
cloudinary.config(credentials);

export const imageStore = {

  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function(imagefile) {
    writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  deleteImage: async function(img) {
    await cloudinary.v2.uploader.destroy(img, {});
  }
};
