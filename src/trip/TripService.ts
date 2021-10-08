import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
  public getTripsByUser(user: User): Trip[] {
    if (this.getLoggedUser() === null) {
      throw new UserNotLoggedInException();
    }

    return user.isFriendsWith(this.getLoggedUser())
      ? this.tripsBy(user)
      : this.noTrips();
  }

  private noTrips(): Trip[] {
    return new Array<Trip>();
  }

  protected getLoggedUser(): User {
    return UserSession.getLoggedUser();
  }

  protected tripsBy(user: User): Trip[] {
    return TripDAO.findTripsByUser(user);
  }
}
