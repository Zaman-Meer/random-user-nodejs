import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const PORT = process.env.PORT || 8000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: PORT as number
};

const config = {
    server: SERVER,
    database: {
        url: process.env.MONGO_DB_URL as string
    }
};

export default config;
