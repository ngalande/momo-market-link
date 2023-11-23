class User {
    constructor(uid, name, email, address, role) {
      (this.uid = uid),
        (this.name = name),
        (this.email = email),
        (this.address = address),
        (this.role = role);
    }
  }
  
module.exports = User;