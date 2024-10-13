import User from "./User_Model";

class Client extends User {
  constructor(
    email,
    password,
    phone,
    token,
    username,
    profile_image,
    underlying_condition,
    is_deleted,
    insurance
  ) {
    super(
      email,
      password,
      phone,
      token,
      username,
      profile_image,
      underlying_condition,
      is_deleted
    );
    this.insurance = insurance;
    this.__t = 0; //not doctor
  }

  toJSON() {
    return {
        ...super.toJSON(),
        is_doc: this.__t
    }
  }
}

export default Client;
