import TicketService from "../services/ticket.service.js";
import UserManager from "../persistence/daos/mongodb/user.manager.js";
import { UserModel } from "../persistence/daos/mongodb/models/user.model.js";
import { HttpResponse } from "../utils/http.response.js";

const ticketService = new TicketService();
const userDao = new UserManager(UserModel);
const httpResponse = new HttpResponse();

export default class TicketController {

  async generateTicket(req, res, next) {
    try {
      const user = await userDao.getUser(req.session.email);
      const ticket = await ticketService.generateTicket(user);
      if(!ticket) return httpResponse.NotFound(res, {msg: 'Error generate ticket'});
      else return httpResponse.Ok(res, {ticket});
    } catch (error) {
      next(error);
    }
  }
}
