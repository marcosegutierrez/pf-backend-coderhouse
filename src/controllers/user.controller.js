import { sendMail } from '../services/mailing.service.js';
import * as services from '../services/user.services.js';
import { HttpResponse } from '../utils/http.response.js';
import { logger } from '../utils/logger.js';

const httpResponse = new HttpResponse();

export const logout = (req, res) => {
  req.session.destroy();
  logger.info('Session destroy!');
  res.redirect("/login");
};

export const registerResponse = (req, res, next) => {
  try {
    res.redirect('/login');
  } catch (error) {
    next(error);
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
    const user = await services.getUserById(id);
    if (!user) return httpResponse.Unauthorized(res, { msg: 'Error de autenticacion' });
    else {
      sessionUser(req, user); // Guarda datos de sesion
      res.redirect('/api/products');
    }
  } catch (error) {
    next(error);
  }
};

// Sin redireccion web
export const loginResponseApiClient = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
    const user = await services.getUserById(id);
    if (!user) return httpResponse.Unauthorized(res, { msg: 'Error de autenticacion' });
    else {
      sessionUser(req, user);
      return httpResponse.Ok(res, { msg: "Autenticado correctamente" });
    }
  } catch (error) {
    next(error);
  }
};

// Sin redireccion web
export const registerResponseApiClient = (req, res, next) => {
  try {
    return httpResponse.Ok(res, { msg: "Usuario registrado correctamente" });
  } catch (error) {
    next(error);
  }
};

export const githubResponse = async (req, res, next) => {
  try {
    const user = await services.getUserById(req.user._id);
    sessionUser(req, req.user);
    res.redirect('/api/products');
  } catch (error) {
    next(error)
  }
}

export const generateResetPass = async (req, res, next) => {
  try {
    const user = req.user;
    const token = await services.generateResetPass(user);
    if (token) {
      await sendMail(user, 'resetPass', token);
      res.cookie('tokenPass', token);
      return httpResponse.Ok(res, {msg: 'Email reset pass send Ok'});
    } else return httpResponse.NotFound(res, {msg: 'Error email reset pass send'});
  } catch (error) {
    next(error);
  }
}

export const updatePass = async (req, res, next) => {
  try {
    const user = await services.getUser(req.session.email);
    const pass = req.body.password;
    const { tokenPass } = req.cookies; // token de 1hs
    if (!tokenPass) return httpResponse.Unauthorized(res, {msg: 'Unhautorized'});
    const updPass = await services.updatePass(pass, user);
    if(!updPass) return httpResponse.NotFound(res, {msg: 'Cannot be the same'});
    res.clearCookie('tokenPass');
    logout(req,res);
  } catch (error) {
    next(error);
  }
}

export const changeRole = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await services.changeRole(uid);
    if (user) return httpResponse.Ok(res, user);
    return httpResponse.NotFound(res, {msg: 'User not found'});
  } catch (error) {
    next(error);
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await services.getUsers();
    return httpResponse.Ok(res, users);
  } catch (error) {
    next(error);
  }
}

export const checkUsersLastConnection = async (req, res, next) => {
  try {
    const data = await services.checkUsersLastConnection();
    return httpResponse.Ok(res, data);
  } catch (error) {
    next(error);
  }
}

const sessionUser = (req, user) => {
  const { first_name, last_name, role, email } = user;
  req.session.email = email;
  req.session.first_name = first_name;
  req.session.last_name = last_name;
  req.session.role = role;
  req.session.cartId = user.cart._id.toString();
}