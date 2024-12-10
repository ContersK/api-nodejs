// Simulação de banco de dados em memória
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
  ];
  
// Função para obter todos os usuários
  export const getUsers = () => {
    return users;
  };

console.log(getUsers());