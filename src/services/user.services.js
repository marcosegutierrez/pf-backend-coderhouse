import UserManager from '../persistence/daos/mongodb/user.manager.js'
import { UserModel } from "../persistence/daos/mongodb/models/user.model.js";
import { createHash, hasBeenMoreThanXTime, validatePassword } from '../utils.js';
import config from '../config.js';
import { sendMail } from './mailing.service.js';
import jwt from 'jsonwebtoken';
import UsersDTO from '../persistence/dtos/users.dto.js';
import UserDTO from '../persistence/dtos/user.dto.js';
import { logger } from '../utils/logger.js';

const userDao = new UserManager(UserModel);

export const login = async (req) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.getUser(email)
        if (!user) return null;
        if (validatePassword(password, user)) {
            await updateLastConnection(user.id)
            return user;
        } else return null
    } catch (error) {
    throw new Error(error);
}
}

export const register = async (user) => {
    try {
        const { password } = user;
        await sendMail(user, 'register');
        return await userDao.register({
            ...user,
            password: createHash(password)
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getUser = async (email) => {
    try {
        return await userDao.getUser(email);
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserById = async (id) => {
    try {
        return await userDao.getUserById(id);
    } catch (error) {
        throw new Error(error);
    }
}

const generateToken = (user, time = '5m') => {
    const payload = { userId: user._id};
    return jwt.sign(payload, config.SECRET_KEY_JWT, { expiresIn: time});
}

export const generateResetPass = async (user) => {
    try {
        return generateToken(user, '1h');
    } catch (error) {
        throw new Error(error);
    }
}

export const updatePass = async (pass, user) => {
    try {
        const isEqual = validatePassword(pass, user);
        if(isEqual) return null;
        const newPass = createHash(pass);
        return await userDao.update(user._id, {password: newPass});
    } catch (error) {
        throw new Error(error);
    }
}

export const changeRole = async (id) => {
    try {
        const user = await userDao.getUserById(id);
        let newRole = user.role;
        if (user.role === "user") {
            newRole = "premium";
        } else if (user.role === "premium") {
            newRole = "user";
        }
        const newUser = new UserDTO(await userDao.update(id, {role: newRole}))
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUsers = async () => {
    try {
        const users = await userDao.getUsers();
        let newUsers = users;
        if (users.length > 0) {
            newUsers = [];
            for (const user of users) {
                const newUser = new UsersDTO(user)
                newUsers.push(newUser);
            }
        }
        return newUsers;
    } catch (error) {
        throw new Error(error);
    }
}

const updateLastConnection = async (id) => {
    try {
        return await userDao.update(id, {
            last_connection: new Date()
        });
    } catch (error) {
        throw new Error(error);
    }
}

export const checkUsersLastConnection = async () => {
    try {
        const usersInactive = [];
        const users = await userDao.getUsers();
        if (users.length > 0) {
            for (const user of users) {
                if (user.last_connection && hasBeenMoreThanXTime(user.last_connection)) {
                    logger.info(`Han pasado mas de 48hs de la ultima conexion de ${user.email}`);
                    await userDao.update(user.id, {active: false});
                    await sendMail(user, 'lastConnection');
                    usersInactive.push(user.email);
                }
            }
        }
        return usersInactive;
    } catch (error) {
        throw new Error(error);       
    }
}