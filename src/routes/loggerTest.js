import { Router } from "express";
import { logger } from "../utils/logger.js";

const router = Router();

// debug: 5,
// http: 4,
// info: 3,
// warning: 2,
// error: 1,
// fatal: 0

router.get('/', (req, res) => {
    logger.debug("Probando logger");
    logger.http("Probando logger");
    logger.info("Probando logger");
    logger.warning("Probando logger");
    logger.error("Probando logger");
    logger.fatal("Probando logger");
    
    res.send(`Haciendo pruebas en logger por consola`);
})

export default router;