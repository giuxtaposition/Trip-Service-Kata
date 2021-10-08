import { expect } from "chai";
import User from "../src/user/User";
import { TripDAO } from "../src/trip/TripDAO";

describe("TripDAO should", () => {
  it("should throw exception when retrieving user trips", () => {
    expect(() => new TripDAO().tripsBy(new User())).to.throw();
  });
});
