import { userModel } from "../models/user.model.js";


export class UserRepository{

    async getUser(uid){
        return await userModel.findById(uid);
    }

    async getUsers(){
        return await userModel.find();
    }

    async updateUser(userId, newRole){
        return await userModel.updateOne({ _id: userId }, { $set: { role: newRole } });
    }

    async createUser(user){
        return userModel.create(user);
    }

    async getUserPopulate(email){
        return await userModel.findOne({ email }).populate('cart');
    }

    async getUserAndDelete(_id){
        return await userModel.findByIdAndDelete(_id);
    }

    async getInactiveUsers(expireDate){
        return await userModel.find({
            last_connection: { $lt: expireDate },
            });
    }

}