import { server } from "./server/Server";
import { Knex } from "./server/database/knex";

//inicialização e verificação de porta do servidor
console.log("iniciando server...");

const startServer = () => {
  server
    .listen(parseInt(process.env.PORT || "3333"), "::", () => {
      console.log(`server rodando na porta numero: ${process.env.PORT}`);
    })
    .on("error", (err) => {
      console.log(
        `falha ao iniciar o server em: ${process.env.PORT}`,
        err.message
      );
    });
};

if (process.env.IS_LOCALHOST !== "true") {
  Knex.migrate
    .latest()
    .then(() => {
      startServer();
    })
    .catch(console.log);
} else {
  startServer();
}
