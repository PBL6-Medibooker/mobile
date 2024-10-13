// User.js

class User {
  constructor(
    email,
    password,
    phone,
    username,
    __t,
    profile_image,
    underlying_condition,
    is_deleted,
    token
  ) {
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.token = token;
    this.username = username;
    this.profile_image = profile_image;
    this.underlying_condition = underlying_condition;
    this.is_deleted = is_deleted;
    this.__t = __t;
  }

  toJSON_Signup() {
    return {
      password: this.password,
      email: this.email,
      phone: this.phone,
      username: this.username,
      is_doc: this.__t === "doctor" ? 1 : 0,
    };
  }

  toJSON_Login() {
    return {
      password: this.password,
      email: this.email,
    };
  }

  // Phương thức để chuyển đổi thành đối tượng JSON
  toJSON() {
    return {
      password: this.password,
      email: this.email,
      phone: this.phone,
      // token: this.token,
      username: this.username,
      // profile_image: this.profile_image,
      // underlying_condition: this.underlying_condition,
      // is_deleted: this.is_deleted,
    };
  }

  toJSON_Client() {
    return {
      password: this.password,
      email: this.email,
      phone: this.phone,
      // token: this.token,
      username: this.username,
      // profile_image: this.profile_image,
      // underlying_condition: this.underlying_condition,
      // is_deleted: this.is_deleted,
      is_doc: 0,
    };
  }

  toJSON_Doctor() {
    return {
      password: this.password,
      email: this.email,
      phone: this.phone,
      // token: this.token,
      username: this.username,
      // profile_image: this.profile_image,
      // underlying_condition: this.underlying_condition,
      // is_deleted: this.is_deleted,
      is_doc: 1,
    };
  }

  // Phương thức để kiểm tra xem người dùng đã đăng nhập chưa
  isLoggedIn() {
    return !!this.token;
  }
}

export default User;
