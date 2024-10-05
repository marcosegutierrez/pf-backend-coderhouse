import express from 'express';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname, readDir } from './utils.js'
import handlebars from 'express-handlebars';
import { initMongoDB } from './persistence/daos/mongodb/connection.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import passport from 'passport';
import './passport/local-strategy.js';
import './passport/github-strategy.js';
import config from './config.js';
import { logger } from './utils/logger.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { info } from './docs/info.js';
import { socketServerOn } from './utils/socket.server.js';
import socketRouter from './utils/socket.server.js';
import cors from 'cors';

logger.info(`Environment: ${process.argv[2]}`)

readDir();

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css";

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        crypto: { secret: config.SECRET_KEY },
        ttl: 180,
    }),
    secret: config.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

const app = express();

const specs = swaggerJSDoc(info);

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});

app
    .use('/docs', swaggerUI.serve, swaggerUI.setup(specs, { customCssUrl: CSS_URL }))
    .use(cors({
        origin: 'https://pf-backend-coderhouse.vercel.app',
        credentials: true
      }))
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cookieParser())
    .use(session(storeConfig))
    .use(express.static(__dirname + '/public'));

app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app
    .use(passport.initialize())
    .use(passport.session())
    .use('/', router)
    .use('/realtimeproducts', socketRouter)
    .use(errorHandler);

initMongoDB();

const httpServer = app.listen(config.PORT, () => logger.info(`Server Ok on port ${config.PORT}`));

socketServerOn(httpServer);

export default app;