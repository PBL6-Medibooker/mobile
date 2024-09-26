// User.js

class User {
    constructor(email, password, phone) {
      this.email = email;         // ID của người dùng
      this.password = password;     // Tên của người dùng
      this.phone = phone;   // Email của người dùng
    //   this.token = token;   // Token xác thực (nếu có)
    }
  
    // Phương thức để chuyển đổi thành đối tượng JSON
    toJSON() {
      return {
        password: this.password,
        email: this.email,
        phone: this.phone,
      };
    }
  
    // Phương thức để kiểm tra xem người dùng đã đăng nhập chưa
    // isLoggedIn() {
    //   return !!this.token;
    // }
  }
  
  export default User;
  