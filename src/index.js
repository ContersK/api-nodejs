import { server } from "./server/Server.js";

const PORT = 3333;



console.log('iniciando server...');
server.listen(PORT, () => {
    console.log(`server rodando na porta numero: ${PORT}`);
}).on('error', (err) => {
    console.log(`falha ao iniciar o server em: ${PORT}`, err.message);
});
