import { createTransport } from "nodemailer";
import config from "../config.js";
import { logger } from "../utils/logger.js";

const transporter = createTransport({
    service: 'gmail',
    port: config.PORT_GMAIL,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
});

const createMsgRegister = name => 
    `<h1>Hola ${name}, ¡Bienvenido/a al Ecomerce!</h1>`;

const createMsgReset = name => 
    `<p>¡Hola ${name}! Hacé click <a href="http://localhost:8080/updatepass">AQUÍ</a> 
        para restablecer tu contraseña.
    </p>`;

const createMsgLastConnection = name =>
    `<p>Hola ${name}, su cuenta ha sido desactivada por inactividad, logeese para reactivar su cuenta.</p>`

const createMsgDeleteProduct = (name, pid) => 
    `<p>Hola ${name}, el producto ${pid} ha sido eliminado.</p>`

export const sendMail = async (user, service, pid = 0, token = null) => {
    try {
        const { first_name, email } = user;
        let msg = '';
        let subj = '';
        
        if (service === 'register') {
            msg = createMsgRegister(first_name)
            subj = 'Bienvenido/a'
        } else if (service === 'resetPass') {
            msg = createMsgReset(first_name)
            subj = 'Restablecer contraseña'
        } else if (service === 'lastConnection') {
            msg = createMsgLastConnection(first_name)
            subj = 'Cuenta desactivada por inactividad'
        } else if (service === 'deleteProduct') {
            msg = createMsgDeleteProduct(first_name, pid)
            subj = 'Su producto ha sido eliminado'
        }
        
        const gmailOptions = {
            from: config.EMAIL,
            to: email,
            subject: subj,
            html: msg
        };

        await transporter.sendMail(gmailOptions);
        logger.info(`Email enviado ${msg}`);
        if (token) return token;

    } catch (error) {
        throw new Error(error)
    }
}