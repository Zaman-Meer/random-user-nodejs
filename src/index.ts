import bodyParser from 'body-parser';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import { userRoutes, sectorRoutes } from './routes';
import { config, logging } from './config';

const NAMESPACE = config.server.hostname;
const router = express();
router.use(cors());
const dbUrl = config.database.url;
mongoose
    .connect(dbUrl, {} as ConnectOptions)
    .then(() => {
        console.log('Connected to MongoDB');
        let port: string | number = config.server.port;
        if (port == null || port == '') {
            port = 8000;
        }
        router.listen(port, () => {
            console.log(`Backend is running: ${port}`);
        });
    })
    .catch((err) => console.log(err));

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});
// Root route
router.get('/', (req, res, next) => {
    res.json({ status: 'Server is Running' });
});

/** Sector Routes go here */
router.use('/api/sector', sectorRoutes);

/** User Routes go here */
router.use('/api/user', userRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});
