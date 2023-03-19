import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { johnDoe, janeDoe, multiTestUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("User Model tests", () => {

  setup(async () => {
    db.init("mongo");
    //await db.userStore.deleteAll();
    //await db.userStore.addUser(johnDoe);
    //await db.userStore.addUser(janeDoe);
    for (let i = 0; i < multiTestUsers.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        multiTestUsers[i] = await db.userStore.addUser(multiTestUsers[i]);
    }
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(johnDoe);
    assertSubset(johnDoe, newUser);
  });

  test("delete all users", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const user = await db.userStore.addUser(johnDoe);
    const returnedUser1 = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser2);
  });

  test("get a user - fail", async () => {
    assert.isNull(await db.userStore.getUserByEmail(""));
    assert.isNull(await db.userStore.getUserById(""));
    assert.isNull(await db.userStore.getUserById());
  });


  test("delete single user - success", async () => {
    await db.userStore.deleteUserById(multiTestUsers[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, multiTestUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(multiTestUsers[0]._id);
    assert.isNull(deletedUser);
  });

  test("delete single user - fail", async () => {
    await db.userStore.deleteUserById("bad-id");
    const allUsers = await db.userStore.getAllUsers();
    assert.equal(multiTestUsers.length, allUsers.length);
  });

  test("edit user name", async () => {
    let user = await db.userStore.addUser(janeDoe);
    assert.equal(user.lastName, janeDoe.lastName);
    let updatedUser = {
      firstName: "Tess",
      lastName: "Update",
    };
    await db.userStore.updateName(user, updatedUser);
    user = await db.userStore.getUserById(user._id);
    assert.equal(user.firstName, "Tess");
    assert.equal(user.lastName, "Update");
  })

  test("edit user password", async () => {
    let user = await db.userStore.addUser(johnDoe);
    assert.equal(user.lastName, johnDoe.lastName);
    let updatedUser = {
        password: "test",
    };
    await db.userStore.updatePassword(user, updatedUser);
    user = await db.userStore.getUserById(user._id);
    assert.equal(user.password, "test");
  })

  test("edit user email", async () => {
    let user = await db.userStore.addUser(johnDoe);
    assert.equal(user.lastName, johnDoe.lastName);
    let updatedUser = {
        email: "test@test.com",
    };
    await db.userStore.updateEmail(user, updatedUser);
    user = await db.userStore.getUserById(user._id);
    assert.equal(user.email, "test@test.com");
  })

  /*
  test("user is admin", async () => {
    let user = await db.userStore.addUser(johnDoe);
    let adminTest = false;
    if (user.isAdmin) {
      adminTest = true;
    } else {
      adminTest = false;
    }
    const adminStatus = await db.userStore.isAdmin(user);
    assert.equal(adminTest, adminStatus);
  })

  test("user not admin", async () => {
    let user = await db.userStore.addUser(janeDoe);
    const adminStatus = await db.userStore.isAdmin(user);
    assert.equal(false, adminStatus);
  })
  
  test("admin variable test", async () => {
    let user = await db.userStore.addUser(johnDoe);
    const adminStatus = await db.userStore.isAdmin(user);
    assert.equal(true, adminStatus);
  })
*/
});
