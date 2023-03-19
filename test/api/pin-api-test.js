import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";
import { testPin, multiTestPins } from "../fixtures.js";
import { johnDoe } from "../fixtures.js"

suite("Pin API tests", () => {
    setup(async () => {
      /* FIXME:
      poiService.clearAuth();
      user = await poiService.createUser(johnDoe);
      await poiService.authenticate(johnDoe);
      await poiService.deleteAllPins();
      await poiService.deleteAllUsers();
      user = await poiService.createUser(johnDoe);
      await poiService.authenticate(johnDoe);
      jd.userid = user._id;
      */
      await poiService.deleteAllPins();
      for (let i = 0; i < multiTestPins.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        multiTestPins[i] = await poiService.createPin(multiTestPins[i]);
      }
    });
    teardown(async () => {
    });
  
    test("create a pin", async () => {
      const newPin = await poiService.createPin(testPin);
      assertSubset(testPin, newPin);
      assert.isDefined(newPin._id);
    });

    test("delete all pins", async () => {
        let returnedPins = await poiService.getAllPins();
        assert.equal(returnedPins.length, 3);
        await poiService.deleteAllPins();
        returnedPins = await poiService.getAllPins();
        assert.equal(returnedPins.length, 0);
      });
    
      test("get a pin - success", async () => {
        const returnedPin = await poiService.getPin(multiTestPins[0]._id);
        assert.deepEqual(multiTestPins[0], returnedPin);
      });
  
      test("get a pin - fail", async () => {
          try {
            const returnedPin = await poiService.getPin("1234");
            assert.fail("Should not return a response");
          } catch (error) {
            assert(error.response.data.message === "No Pin with this id");
            assert.equal(error.response.data.statusCode, 503);
          }
      });
  
      test("get a pin - deleted pin", async () => {
          await poiService.deleteAllPins();
          try {
            const returnedPin = await poiService.getPin(multiTestPins[0]._id);
            assert.fail("Should not return a response");
          } catch (error) {
            assert(error.response.data.message === "No Pin with this id");
            assert.equal(error.response.data.statusCode, 404);
          }
      });
  });