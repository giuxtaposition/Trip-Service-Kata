import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import Trip from "./Trip";
import { TripDAO } from "./TripDAO";

export default class TripService {
  private tripDAO: TripDAO;

  constructor() {
    this.tripDAO = new TripDAO();
  }

  public getFriendsTrip(friend: User, loggedInUser: User): Trip[] {
    this.validate(loggedInUser);

    return friend.isFriendsWith(loggedInUser)
      ? this.tripsBy(friend)
      : this.noTrips();
  }

  private validate(loggedInUser: User) {
    if (loggedInUser === null) {
      throw new UserNotLoggedInException();
    }
  }

  private noTrips(): Trip[] {
    return new Array<Trip>();
  }

  private tripsBy(user: User): Trip[] {
    return this.tripDAO.tripsBy(user);
  }
}
