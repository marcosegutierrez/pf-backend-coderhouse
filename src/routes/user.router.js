import { Router } from "express";
const router = Router();
import {
    logout, 
    loginResponse, 
    registerResponse,
    githubResponse,
    loginResponseApiClient,
    generateResetPass,
    updatePass,
    changeRole,
    getUsers,
    checkUsersLastConnection,
    registerResponseApiClient
} from "../controllers/user.controller.js";
import passport from "passport";
import { checkRole } from "../middlewares/checkRole.js";

router.route('/')
    .get(getUsers)
    .delete(checkRole, checkUsersLastConnection);

router.post('/logout', logout);

router.post('/login', passport.authenticate('login'), loginResponse);
router.post('/register', passport.authenticate('register'), registerResponse);

router.post('/register-api-client', passport.authenticate('register', {failureMessage: true}), registerResponseApiClient);
router.post('/login-api-client', passport.authenticate('login'), loginResponseApiClient);

router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/profile', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);

router.post('/resetpass', generateResetPass);
router.post('/updatepass', updatePass);

router.get('/premium/:uid', changeRole);

export default router;
