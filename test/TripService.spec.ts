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

  beforeEach(() => {
    tripService = new TestableTripService();
    loggedInUser = REGISTERED_USER;
  });

  it("throw an exception when user is not logged in", () => {
    loggedInUser = GUEST;

    expect(() => {
      tripService.getTripsByUser(UNUSED_USER);
    }).to.throw(UserNotLoggedInException);
  });

  it("not return any trips when users are not friends", () => {
    let friend = UserBuilder.prototype
      .aUser()
      .friendsWith(ANOTHER_USER)
      .withTrips(TO_BRAZIL)
      .build();

    let friendTrips: Trip[] = tripService.getTripsByUser(friend);

    expect(friendTrips.length).to.equal(0);
  });

  it("return trips when users are friends", () => {
    let friend: User = UserBuilder.prototype
      .aUser()
      .friendsWith(ANOTHER_USER, loggedInUser)
      .withTrips(TO_LONDON, TO_BRAZIL)
      .build();

    let friendTrips: Trip[] = tripService.getTripsByUser(friend);

    expect(friendTrips.length).to.equal(2);
  });

  class UserBuilder {
    private friends: User[];
    private trips: Trip[];

    public aUser(): UserBuilder {
      return new UserBuilder();
    }

    public withTrips(...trips: Trip[]) {
      this.trips = trips.map((trip) => {
        return trip;
      });
      return this;
    }

    public friendsWith(...friends: User[]): UserBuilder {
      this.friends = friends.map((friend) => {
        return friend;
      });
      return this;
    }

    public build(): User {
      let user: User = new User();
      this.addTripsTo(user);
      this.addFriendsTo(user);
      return user;
    }

    private addTripsTo(user: User) {
      this.trips.forEach((trip) => {
        user.addTrip(trip);
      });
    }

    private addFriendsTo(user: User) {
      this.friends.forEach((friend) => {
        user.addFriend(friend);
      });
    }
  }

  class TestableTripService extends TripService {
    protected getLoggedUser(): User {
      return loggedInUser;
    }

    protected tripsBy(user: User): Trip[] {
      return user.getTrips();
    }
  }
});
