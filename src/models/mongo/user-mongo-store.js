import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async updateName(user, updatedUser) {
    const dbUser = await User.findOne({ _id: user._id }).lean();
    if (updatedUser.firstName !== null && updatedUser.firstName !== undefined && updatedUser.firstName !== "") {
      User.updateOne(
        { _id: user._id },
        { firstName: updatedUser.firstName}
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
    }  
    if (updatedUser.lastName !== null && updatedUser.lastName !== undefined && updatedUser.lastName !== "") {
      User.updateOne(
        { _id: user._id },
        { lastName: updatedUser.lastName}
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
    }
  },  

  async updatePassword(user, updatedUser) {
    const dbUser = await User.findOne({ _id: user._id }).lean();
    if (updatedUser.password !== null && updatedUser.password !== undefined && updatedUser.password !== "") {
      User.updateOne(
        { _id: user._id },
        { password: updatedUser.password}
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
    }  
  },  

  async updateEmail(user, updatedUser) {
    const dbUser = await User.findOne({ _id: user._id }).lean();
    if (updatedUser.email !== null && updatedUser.email !== undefined && updatedUser.email !== "") {
      User.updateOne(
        { _id: user._id },
        { email: updatedUser.email}
      )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
    }  
  },  

  async isAdmin(user) {
    const dbUser = await User.findOne({ _id: user._id }).lean();
    if (dbUser?.isAdmin) {
        return true;
    }
    else {
      return false;
    }  
  },  

};