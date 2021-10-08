import Trip from "../src/trip/Trip";
import User from "../src/user/User";

export class UserBuilder {
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
    if (this.trips) {
      this.trips.forEach((trip) => {
        user.addTrip(trip);
      });
    }
  }

  private addFriendsTo(user: User) {
    if (this.friends) {
      this.friends.forEach((friend) => {
        user.addFriend(friend);
      });
    }
  }
}
