import express from 'express';
import 'dotenv/config.js';
import { router } from './routes/index.js';


const server = express();


server.use(express.json());
server.use(router);






export { server };
