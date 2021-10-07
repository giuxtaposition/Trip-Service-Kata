import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";

class TestableTripService extends TripService {
  protected getLoggedUser(): User {
    return null;
  }
}

describe("Trip Service should", () => {
  it("throw an exception when user is not logged in", () => {
    let tripService: TestableTripService = new TestableTripService();

    expect(() => {
      tripService.getTripsByUser(null);
    }).toThrow(UserNotLoggedInException);
  });
});
