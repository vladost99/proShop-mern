module.exports = class UserDto {
    email;
    _id;
    name;
    isAdmin;
    
    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.name = model.name;
        this.isAdmin = model.isAdmin;
    }
}
