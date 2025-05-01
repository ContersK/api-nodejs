import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Usuário - SignUp', () => {
  it('Cadastra usuário 1', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      senha: '123456',
      nome: 'Juca da Silva',
      email: 'jucasilva@gmail.com',
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('object');
  });
  it('Cadastra usuário 2', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      senha: '123456',
      nome: 'Pedro da Rosa',
      email: 'pedro@gmail.com',
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('object');
  });
  it('Erro ao cadastrar um usuário com email duplicado', async () => {
    const emailDuplicado = 'pedroduplicado@gmail.com';

    const res1 = await testServer.post('/cadastrar').send({
      senha: '123456',
      nome: 'Pedro da Rosa',
      email: emailDuplicado,
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('object');

    const res2 = await testServer.post('/cadastrar').send({
      senha: '123456',
      nome: 'Juca da Silva',
      email: emailDuplicado,
    });

    expect(res2.statusCode).toEqual(StatusCodes.CONFLICT);
    expect(res2.body).toHaveProperty('errors.default');
  });
  it('Erro ao cadastrar um usuário sem email', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      senha: '123456',
      nome: 'Juca da Silva',
      // email: 'jucasilva@gmail.com',
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Erro ao cadastrar um usuário sem nome', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      senha: '123456',
      // nome: 'Juca da Silva',
      email: 'jucasilva@gmail.com',
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
  it('Erro ao cadastrar um usuário sem senha', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      // senha: '123456',
      nome: 'Juca da Silva',
      email: 'jucasilva@gmail.com',
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });
  it('Erro ao cadastrar um usuário com email inválido', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      senha: '123456',
      nome: 'Juca da Silva',
      email: 'jucasilva gmail.com',
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Erro ao cadastrar um usuário com senha muito pequena', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      senha: '123',
      nome: 'Juca da Silva',
      email: 'jucasilva@gmail.com',
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');
  });
  it('Erro ao cadastrar um usuário com nome muito pequeno', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      senha: '123456',
      nome: 'Ju',
      email: 'jucasilva@gmail.com',
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
});
