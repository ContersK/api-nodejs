import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
  it("Cria registro", async () => {
    const res1 = await testServer.delete("/cidades/:id").send({ id: "1" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar um registro com id decimal", async () => {
    const res1 = await testServer.post("/cidades").send({ id: "1.2" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("body.id");
  });
  it("tenta criar registro de string em um numerico", async () => {
    const res1 = await testServer.post("/cidades").send({ id: "pipa" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("body.id");
  });
});
