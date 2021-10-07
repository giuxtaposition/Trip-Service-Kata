import { expect } from "chai";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import Trip from "../src/trip/Trip";

describe("Trip Service should", () => {
  const GUEST: User = null;
  const UNUSED_USER: User = null;
  const REGISTERED_USER: User = new User();
  const ANOTHER_USER: User = new User();
  const TO_BRAZIL: Trip = new Trip();
  const TO_LONDON: Trip = new Trip();
  let loggedInUser: User;
  let tripService: TripService;

  class TestableTripService extends TripService {
    protected getLoggedUser(): User {
      return loggedInUser;
    }

    protected tripsBy(user: User): Trip[] {
      return user.getTrips();
    }
  }

  beforeEach(() => {
    tripService = new TestableTripService();
  });

  it("throw an exception when user is not logged in", () => {
    loggedInUser = GUEST;

    expect(() => {
      tripService.getTripsByUser(UNUSED_USER);
    }).to.throw(UserNotLoggedInException);
  });

  it("not return any trips when users are not friends", () => {
    loggedInUser = REGISTERED_USER;

    let friend = new User();
    friend.addFriend(ANOTHER_USER);
    friend.addTrip(TO_BRAZIL);

    let friendTrips: Trip[] = tripService.getTripsByUser(friend);

    expect(friendTrips.length).to.equal(0);
  });

  it("return trips when users are friends", () => {
    loggedInUser = REGISTERED_USER;

    let friend = new User();
    friend.addFriend(ANOTHER_USER);
    friend.addFriend(loggedInUser);
    friend.addTrip(TO_BRAZIL);
    friend.addTrip(TO_LONDON);

    let friendTrips: Trip[] = tripService.getTripsByUser(friend);

    expect(friendTrips.length).to.equal(2);
  });
});
