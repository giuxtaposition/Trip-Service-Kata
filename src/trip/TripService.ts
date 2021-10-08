import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
  public getTripsByUser(user: User, loggedInUser: User): Trip[] {
    if (loggedInUser === null) {
      throw new UserNotLoggedInException();
    }

    return user.isFriendsWith(loggedInUser)
      ? this.tripsBy(user)
      : this.noTrips();
  }

  private noTrips(): Trip[] {
    return new Array<Trip>();
  }

  protected tripsBy(user: User): Trip[] {
    return TripDAO.findTripsByUser(user);
  }
}
