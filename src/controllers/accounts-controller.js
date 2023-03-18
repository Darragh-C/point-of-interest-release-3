import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      console.log("Rendering main view");
      return h.view("main", { title: "Welcome to Point of Interest" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      console.log("Rendering signup view");
      return h.view("signup-view", { title: "Sign up for Point of Interest" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      console.log("Adding user");
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      console.log("Rendering login view");
      return h.view("login-view", { title: "Login to Point of Interest" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      console.log("Rendering dashboard");
      return h.redirect("/dashboard");
    },
  },
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      console.log("Logging user out");
      return h.redirect("/");
    },
  },
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    console.log("Validating user");
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};