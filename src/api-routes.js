import { userApi } from "./api/user-api.js";
import { pinApi } from "./api/pin-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

    { method: "GET", path: "/api/pins", config: pinApi.find },
    { method: "POST", path: "/api/pins", config: pinApi.create },
    { method: "DELETE", path: "/api/pins", config: pinApi.deleteAll },
    { method: "GET", path: "/api/pins/{id}", config: pinApi.findOne },   
    
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  ];