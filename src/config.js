import 'dotenv/config';

export default {
    MONGO_URL: process.env.MONGO_URL ,
    SECRET_KEY: process.env.SECRET_KEY ,
    CLIENT_ID: process.env.CLIENT_ID ,
    CLIENT_SECRET: process.env.CLIENT_SECRET ,
    CALLBACK_URL: process.env.CALLBACK_URL ,
    PORT: process.env.PORT ,
    CODER_EMAIL: process.env.CODER_EMAIL,
    CODER_PASS: process.env.CODER_PASS,
    PORT_GMAIL: process.env.PORT_GMAIL,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    SECRET_KEY_JWT: process.env.SECRET_KEY_JWT
}