import { userMemStore } from "./mem/user-mem-store.js";
import { pinMemStore } from "./mem/pin-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { pinJsonStore } from "./json/pin-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { pinMongoStore } from "./mongo/pin-mongo-store.js";

export const db = {
  userStore: null,
  pinStore: null,
  

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.pinStore = pinJsonStore;
        break;
      case "mongo": 
        this.userStore = userMongoStore;
        this.pinStore = pinMongoStore;
        connectMongo();
        break; 
      default:
        this.userStore = userMemStore;
        this.pinStore = pinMemStore;
    }
  },
};