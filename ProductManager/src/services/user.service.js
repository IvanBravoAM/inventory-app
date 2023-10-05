import { UserRepository } from "../DAO/user.repository.js";
import UserDTO from "../DTO/user.dto.js";
const userRepository = new UserRepository();

export class UserService{
    async getUser(uid){
        try{
            const user = await userRepository.getUserPopulate(uid);
            return new UserDTO(user);
        }
        catch(error){
            console.log(error);
        }
    }
    async addUser(user){
        try{
            const userResult = await userRepository.createUser(user);
            return new UserDTO(userResult);
        }catch(error){
            console.log(error);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await userRepository.getUserPopulate(email);
            return user;
        } catch (error) {
            throw error;
        }
    }
}