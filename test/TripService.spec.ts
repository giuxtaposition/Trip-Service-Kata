import { expect } from "chai";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import Trip from "../src/trip/Trip";
import * as TripDAOModule from "../src/trip/TripDAO";
import { UserBuilder } from "./userBuilder";
import { ImportMock, MockManager } from "ts-mock-imports";

describe("Trip Service should", () => {
  const GUEST: User = null;
  const UNUSED_USER: User = null;
  const REGISTERED_USER: User = new User();
  const ANOTHER_USER: User = new User();
  const TO_BRAZIL: Trip = new Trip();
  const TO_LONDON: Trip = new Trip();

  let mockedTripDAO: MockManager<TripDAOModule.TripDAO>;
  let tripService: TripService;

  beforeEach(() => {
    mockedTripDAO = ImportMock.mockClass(TripDAOModule, "TripDAO");
    tripService = new TripService();
  });

  it("throw an exception when user is not logged in", () => {
    expect(() => {
      tripService.getFriendsTrip(UNUSED_USER, GUEST);
    }).to.throw(UserNotLoggedInException);
  });

  it("not return any trips when users are not friends", () => {
    let friend = UserBuilder.prototype
      .aUser()
      .friendsWith(ANOTHER_USER)
      .withTrips(TO_BRAZIL)
      .build();

    mockedTripDAO.mock("tripsBy", friend.getTrips());

    let friendTrips: Trip[] = tripService.getFriendsTrip(
      friend,
      REGISTERED_USER
    );

    expect(friendTrips.length).to.equal(0);
  });

  it("return trips when users are friends", () => {
    let friend: User = UserBuilder.prototype
      .aUser()
      .friendsWith(ANOTHER_USER, REGISTERED_USER)
      .withTrips(TO_LONDON, TO_BRAZIL)
      .build();

    mockedTripDAO.mock("tripsBy", friend.getTrips());

    let friendTrips: Trip[] = tripService.getFriendsTrip(
      friend,
      REGISTERED_USER
    );

    expect(friendTrips.length).to.equal(2);
  });
});
