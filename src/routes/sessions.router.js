import { Router } from "express";
import UserRepository from "../persistence/repository/user.repository.js";
const userRepository = new UserRepository();

const router = Router();

// Debe haber un logeo previo
router.get('/current', async (req, res) => {
    if (req.session.email) {
        const user = await userRepository.getUser(req.session.email);
        res.status(200).json({user: user});
    } else res.status(401).json({ msg: 'Error de autenticacion' });
})

export default router;