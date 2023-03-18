import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";

export const settingsController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;  
      const viewData = {
        title: "User settings",
        firstname: loggedInUser.firstName, 
        lastname: loggedInUser.lastName, 
      };
      console.log("Rendering settings view");
      return h.view("settings-view", viewData);
    },
  },

  updateName: {
    handler: async function (request, h) {
        let loggedInUser = request.auth.credentials;
        const user = await db.userStore.getUserById(loggedInUser._id);
        let userChanges = {
          firstName: request.payload.firstname,
          lastName: request.payload.lastname,
        };
        console.log("Validating user");
        if (request.payload.password === user.password) {
          console.log("Updating user name");
          await db.userStore.updateName(user, userChanges);
        }
        
        const updatedUser = await db.userStore.getUserById(loggedInUser._id);
        const viewData = {
          title: "User settings",
          firstname: updatedUser.firstName, 
          lastname: updatedUser.lastName, 
        };
        console.log("Rendering settings view");
        return h.view("settings-view", viewData);
    }
  },

  updateEmail: {
    handler: async function (request, h) {
        let loggedInUser = request.auth.credentials;
        const user = await db.userStore.getUserById(loggedInUser._id);
        let userChanges = {
          email: request.payload.email,
        };
        console.log("Validating user");
        if (request.payload.password === user.password) {
          console.log("Updating email");
          await db.userStore.updateEmail(user, userChanges);
        }
        const updatedUser = await db.userStore.getUserById(loggedInUser._id);
        const viewData = {
          title: "User settings",
          firstname: updatedUser.firstName, 
          lastname: updatedUser.lastName, 
        };
        console.log("Rendering settings view");
        return h.view("settings-view", viewData);
    }
  },

  updatePassword: {
    handler: async function (request, h) {
        let loggedInUser = request.auth.credentials;
        const user = await db.userStore.getUserById(loggedInUser._id);
        let userChanges = {
          password: request.payload.newpassword
        };
        console.log("Validating user");
        if (request.payload.oldpassword === user.password) {
          console.log("Updating password");
          await db.userStore.updatePassword(user, userChanges);
        }
        const updatedUser = await db.userStore.getUserById(loggedInUser._id);
        const viewData = {
          title: "User settings",
          firstname: updatedUser.firstName, 
          lastname: updatedUser.lastName, 
        };
        console.log("Rendering settings view");
        return h.view("settings-view", viewData);
    }
  },  
};