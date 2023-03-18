import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/users.json"));
db.data = { users: [] };

export const userJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id) {
    await db.read();
    let u = db.data.users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async getUserByEmail(email) {
    await db.read();
    let u = db.data.users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u;
  },

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },

  async editFirstname(user, updatedName) {
    await db.read();
    let userToUpdate = db.data.users.find((u) => u._id === user._id);
    userToUpdate.firstName = updatedName.toString();
    await db.write();
  },

  async editLastname(user, updatedName) {
    await db.read();

    let userToUpdate = db.data.users.find((u) => u._id === user._id);
    userToUpdate.lastName = updatedName.toString();
    await db.write();
  },

  async updateName(user, updatedUser) {
    await db.read();
    let u = db.data.users.find((use) => use._id === user._id);
    if (updatedUser.firstName !== null) {
      u.firstName = updatedUser.firstName;
    } else {
      u.firstName = "Error";
    }
    if (updatedUser.lastName !== null) {
      u.lastName = updatedUser.lastName;
    } else {
      u.lastName = "Error";
    }
    await db.write();
  },

  async updatePassword(user, updatedUser) {
    await db.read();
    let u = db.data.users.find((use) => use._id === user._id);
    if (updatedUser.password !== null) {
      u.password = updatedUser.password;
    } 
    await db.write();
  },

  async updateEmail(user, updatedUser) {
    await db.read();
    let u = db.data.users.find((use) => use._id === user._id);
    if (updatedUser.email !== null) {
      u.email = updatedUser.email;
    } 
    await db.write();
  },

  async isAdmin(user) {
    await db.read();
    let u = db.data.users.find((admin) => admin._id === user._id);
    //if (u === undefined) u = null;
    if (u?.isAdmin) {
      return true;
    }
    else {
      return false;
    }  
  }
};