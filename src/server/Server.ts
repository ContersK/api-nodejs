import express from "express";
import "dotenv/config";
import { router } from "./routes/index";
//import "./shared/services/translationsYup"; não esta funcionando!

const server = express();

server.use(express.json());
server.use(router);

export { server };
