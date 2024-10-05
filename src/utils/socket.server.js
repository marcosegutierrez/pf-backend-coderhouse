import { Server } from 'socket.io';
import { logger } from './logger.js';
import MessageManagerMongo from '../persistence/daos/mongodb/messages.manager.js';
import { Router } from 'express';
// import { deleteRealTimeProducts, postRealTimeProducts } from '../controllers/realtime.ctrl.js';
// import { productValidator } from '../middlewares/productValidator.js';

const router = Router();

const messageManager = new MessageManagerMongo();

export const socketServerOn = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', async (socket) => {
        logger.info(`Cliente conectado: ${socket.id}`);
        socketServer.emit('messages', await messageManager.getAll());

        socket.on('disconnect', () => logger.info(`Cliente desconectado: ${socket.id}`));

        socket.on('newUser', (user) => {
            logger.info(`=> ${user} ha iniciado sesión`);
            socket.emit('newUser', user);
        })

        socket.on('chat:message', async (msg) => {
            await messageManager.createMsg(msg);
            socketServer.emit('messages', await messageManager.getAll());
        })

        socket.on('chat:typing', (data) => {
            socket.broadcast.emit('chat:typing', data)
        })

    });

    // router.post('/', productValidator, postRealTimeProducts(socketServer));
    // router.delete('/:pid', deleteRealTimeProducts(socketServer));
}

export default router;