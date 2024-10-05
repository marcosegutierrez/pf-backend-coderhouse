import * as cartServices from './carts.services.js';
import * as productServices from './products.services.js';
import TicketDaoMongo from '../persistence/daos/mongodb/ticket.dao.js';

const ticketDao = new TicketDaoMongo();

export default class TicketService{
  constructor() {
    this.dao = ticketDao;
  }

  prodsOutTicket = [];

  async generateTicket(user) {
    try {
      const cart = await cartServices.getCartById(user.cart);
      if (!cart) return null;

      let amountAcc = 0;
      if (cart.products.length > 0) {
        for (const prodInCart of cart.products) {
          const idProd = prodInCart.product;
          const prodDB = await productServices.getProductById(idProd);
          if (prodInCart.quantity <= prodDB.stock) {
            const amount = prodInCart.quantity * prodDB.price;
            amountAcc += amount;
            const newStock = prodDB.stock - prodInCart.quantity
            const product = await productServices.updateProduct(idProd, {"stock": newStock}, "admin")
          } else {
            this.prodsOutTicket.push(idProd);
          }
        }
      }

      const ticket = await this.dao.create({
        purchase_datetime: new Date().toLocaleString(),
        amount: amountAcc,
        purchaser: user.email,
      });

      await cartServices.deleteCart(user.cart);
      
      for (const pid of this.prodsOutTicket) {
        await cartServices.addProductToCart(user.cart, pid);
      }

      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }
}
