import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";

export const adminController = {
    index: {
        handler: async function (request, h) {
          const loggedInUser = request.auth.credentials;
          const users = await db.userStore.getAllUsers();
          const pins = await db.pinStore.getAllPins();
          const pinTotal = await db.pinStore.getPinsTotal();
          const userTotal = await db.userStore.getUsersTotal();
          const pinTotalCounty = await db.pinStore.pinsCategoryCount("county");

          const viewData = {
            title: "Admin",
            user: loggedInUser,
            users: users,
            pins: pins,
            pinTotal: pinTotal,
            userTotal: userTotal,
            pinTotalCounty: pinTotalCounty,
          };
          console.log("Rendering admin view");
          return h.view("admin-view", viewData);
        },
    },

    deleteUser: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const user = db.userStore.getUserById(loggedInUser._id);
            /*
            FIXME 
            const isAdmin = await db.userStore.isAdmin(user);
            if (isAdmin) {
                
            }   
            */  
            console.log("Deleting user");
            await db.userStore.deleteUserById(request.params.id);
            console.log("Rendering admin view");
            return h.redirect("/admin");
        }
    },

    sortPins: {
      handler: async function (request, h) {
        const routePath = request.path;
        const pathItems = routePath.split("/");
        const key = pathItems.pop();
        const sortedPins = await db.pinStore.getAllPinsSort(key);

        const users = await db.userStore.getAllUsers();
        const viewData = {
          title: "Admin",
          users: users,
          pins: sortedPins,
        };
        console.log("Rendering admin view");
        return h.view("admin-view", viewData);
      },
    },

    sortUsers: {
      handler: async function (request, h) {
        const routePath = request.path;
        const pathItems = routePath.split("/");
        const key = pathItems.pop();
        const sortedUsers = await db.userStore.getAllUsersSort(key);

        const pins = await db.pinStore.getAllPins();
        const viewData = {
          title: "Admin",
          users: sortedUsers,
          pins: pins,
        };
        console.log("Rendering admin view");
        return h.view("admin-view", viewData);
      },
    },
};