import * as services from '../services/user.services.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const strategyConfig = {
    usernameField: 'email',
    passportField: 'password',
    passReqToCallback: true
};

const signUp = async (req, email, password, done) => {
    try {
        const user = await services.getUser(email);
        if(user) return done(null, false);
        const newUser = await services.register(req.body);
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};

const signIn = async (req, email, password, done) => {
    try {
        const userLogin = await services.login(req);
        if(!userLogin){
            req.session.destroy();
            return done(null, false, { message: 'Credenciales incorrectas ⛔' });
        }
        return done(null, userLogin)
    } catch (error) {
        return done(error)
    }
};

const signUpStrategy = new LocalStrategy(strategyConfig, signUp);
const signInStrategy = new LocalStrategy(strategyConfig, signIn);

passport.use('register', signUpStrategy);
passport.use('login', signInStrategy);

//passport solo guarda el id
passport.serializeUser((user, done)=>{
    done(null, user._id)
});

//passport busca datos de usuario solo cuando lo necesita
passport.deserializeUser(async(id, done)=>{
    try {
        const user = await services.getUserById(id);
        return done(null, user);
    } catch (error) {
        done(error)
    }
});