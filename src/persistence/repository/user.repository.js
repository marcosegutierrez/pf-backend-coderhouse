import UserManager from '../daos/mongodb/user.manager.js';
import { UserModel } from '../daos/mongodb/models/user.model.js';
import UserDTO from '../dtos/user.dto.js';
const userDao = new UserManager(UserModel);

export default class UserRepository {
    constructor(){
        this.dao = userDao;
    }

    async getUser(email) {
        try {
          const user = await this.dao.getUser(email);
          return new UserDTO(user);
        } catch (error) {
          throw new Error(error);
        }
    };
}