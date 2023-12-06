import { UserRepository } from "../DAO/user.repository.js";
import UserDTO from "../DTO/user.dto.js";
import { transporter } from "../services/mail.service.js";
const userRepository = new UserRepository();

export class UserService{
    async getUser(uid){
        try{
            const user = await userRepository.getUser(uid);
            return new UserDTO(user);
        }
        catch(error){
            console.log(error);
        }
    }

    async getUsers(){
        try{
            const users = await userRepository.getUsers();
            const userDTOs = users.map(user => {
                return new UserDTO(user);
            });
            return userDTOs;
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

    async updateUser(userId, newRole){
        try{
            const result = await userRepository.updateUser(userId, newRole);
            return result;
        }
        catch(error){
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

    async deleteInactiveUsers() {
        try {
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        
            const inactiveUsers = await userRepository.getInactiveUsers(twoDaysAgo);
        
            const deletionPromises = inactiveUsers.map(async (user) => {
                await this.sendDeleteAccountEmail(user.email);
                await userRepository.getUserAndDelete(user._id);
            });
        
            await Promise.all(deletionPromises);
        
            console.log(`${inactiveUsers.length} inactive users deleted.`);
        } catch (error) {
            console.error('Error deleting inactive users:', error);
        }
    }

    async deleteUser(uid){
        try {
            const user = await userRepository.getUser(uid);
            await this.sendDeleteAccountEmail(user.email);
            await userRepository.getUserAndDelete(uid);
        
        } catch (error) {
            console.error('Error deleting inactive users:', error);
        }
    }

    async sendDeleteAccountEmail(userEmail) {
        const mailOptions = {
            from: 'inventory-app@gmail.com',
            to: userEmail,
            subject: 'Account Deletion Notification',
            text: 'Your account has been deleted.',
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log(`Deletion notification email sent to ${userEmail}`);
        } catch (error) {
            console.error('Error sending deletion notification email:', error);
        }
        }

}