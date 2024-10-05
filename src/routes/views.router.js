import { Router } from "express";
import { 
    // realTimeProducts, 
    viewChat, 
    viewLogin, 
    viewProfile, 
    viewRegister, 
    viewUpdatePass} from "../controllers/views.controller.js";

const router = Router();

router.get('/', viewLogin);

router.get("/login", viewLogin);

router.get("/register", viewRegister);

router.get("/profile", viewProfile);

// router.get('/realtimeproducts', realTimeProducts)

router.get('/chat', viewChat);

router.get('/updatepass', viewUpdatePass);

export default router;