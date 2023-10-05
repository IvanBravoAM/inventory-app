import { userModel } from "../models/user.model.js";


export class UserRepository{

    async getUser(uid){
        return userModel.findById(uid);
    }
    async createUser(user){
        return userModel.create(user);
    }

    async getUserPopulate(email){
        return await userModel.findOne({ email }).populate('cart');
    }

}