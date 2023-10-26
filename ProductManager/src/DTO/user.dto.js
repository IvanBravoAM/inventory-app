
export default class UserDTO {
    constructor(user) {
        console.log('on dto debug', user.first_name)
        this.id = user.id || 'none';
        this.first_name= user.first_name || 'none';
        this.last_name= user.last_name || 'none';
        this.email = user.email || 'none';
        this.role = user.role || 'user';
    }
}
