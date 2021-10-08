import { expect } from "chai";
import User from "../src/user/User";
import { UserBuilder } from "./userBuilder";

describe("User should", () => {
  const BOB: User = new User();
  const PAUL: User = new User();

  it("inform when users are not friends", () => {
    let user: User = UserBuilder.prototype.aUser().friendsWith(BOB).build();
    expect(user.isFriendsWith(PAUL)).to.equal(false);
  });

  it("inform when users are friends", () => {
    let user: User = UserBuilder.prototype
      .aUser()
      .friendsWith(BOB, PAUL)
      .build();
    expect(user.isFriendsWith(PAUL)).to.equal(true);
  });
});
