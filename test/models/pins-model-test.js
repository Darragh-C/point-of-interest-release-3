import { assert, expect } from "chai";
import { db } from "../../src/models/db.js";
import { testPin, multiTestPins, mongoGroupResponse } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Pin Model tests", () => {
    
   setup(async () => {
        db.init("mongo");
        //await db.pinStore.deleteAll();
        for (let i = 0; i < multiTestPins.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            multiTestPins[i] = await db.pinStore.addPin(multiTestPins[i]);
            done();
        }
    });

    test("create a pin", async () => {
        const newPin = await db.pinStore.addPin(testPin);
        assertSubset(testPin, newPin);
    });

    test("delete all pins", async () => {
        let returnedPins = await db.pinStore.getAllPins();
        assert.equal(returnedPins.length, 3);
        await db.pinStore.deleteAll();
        returnedPins = await db.pinStore.getAllPins();
        assert.equal(returnedPins.length, 0);
    });

    test("get a pin by id - success", async () => {
        const pin = await db.pinStore.addPin(testPin);
        const returnedPin1 = await db.pinStore.getPinById(pin._id);
        assert.deepEqual(pin, returnedPin1);
    });

    test("get a pin by id - bad params", async () => {
        assert.isNull(await db.pinStore.getPinById(""));
        assert.isNull(await db.pinStore.getPinById());
    });

    test("delete single pin - success", async () => {
        await db.pinStore.deletePinById(multiTestPins[0]._id)
        const returnedPins = await db.pinStore.getAllPins();
        assert.equal(returnedPins.length, multiTestPins.length - 1);
        const deletedPin = await db.pinStore.getPinById(multiTestPins[0]._id);
        assert.isNull(deletedPin);
    });

    test("delete single pin - fail", async () => {
        await db.pinStore.deletePinById("bad-id");
        const allPins = await db.pinStore.getAllPins();
        assert.equal(multiTestPins.length, allPins.length);
    });

    test("get user pins", async () => {
        let dbUserPins = [];
        for (let i = 0; i < multiTestPins.length; i += 1) {
            if (multiTestPins[i].userid === "12345") {
                dbUserPins.push(multiTestPins[i]);
            }
        }
        let userPins = db.pinStore.getUserPins("12345");
        assertSubset(dbUserPins, userPins);
    })

    test("get pin category", async () => {
        const pin = await db.pinStore.addPin(testPin);
        //const dbCategory = pin.category;
        const category = await db.pinStore.getPinCategory(pin._id);
        assert.equal(pin.category, category);
    })

    test("get distinct categories of all pins", async () => {
        const fixturesCats = ["aires", "public parking"];
        let categories = await db.pinStore.getPinsCategories();
        expect(fixturesCats).to.eql(categories);
    })

    test("get pins by category", async () => {
        const category = "aires";
        const aires = [];
        for (let i = 0; i < multiTestPins.length; i += 1) {
            if (multiTestPins[i].category === category) {
                aires.push(multiTestPins[i]);
            }
        }
        const categoryPins = await db.pinStore.getPinsByCategory(category);
        expect(aires).to.eql(categoryPins);
    })

    test("group pins by category", async () => {
        const categoryGroups = await db.pinStore.groupPinsByCategory();
        assertSubset(mongoGroupResponse, categoryGroups);
    })
    
    test("update pin info", async () => {
        const dbPin = await db.pinStore.addPin(testPin);
        const pinUpdates = {
          "name": "testName",
          "description": "testDesc",
          "lattitude": "testLat",
          "longitude": "testLong",  
        };
        await db.pinStore.updatePin(dbPin, pinUpdates);
        const updatedPin = db.pinStore.getPinById(dbPin._id);
        assertSubset(updatedPin, pinUpdates);
    })
});