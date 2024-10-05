import { Router } from "express";
import productsRouter from './products.router.js';
import cartsRouter from './carts.router.js';
import viewsRouter from './views.router.js';
import usersRouter from './user.router.js';
import sessionsRouter from './sessions.router.js';
import ticketRouter from './ticket.router.js';
import loggerRouter from './loggerTest.js';

const router = Router();

router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/', viewsRouter); // rutas para las vistas
router.use('/users', usersRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/ticket', ticketRouter); // --> ticket/purchase
router.use('/loggerTest', loggerRouter); // --> pruebas en logger por consola

export default router;