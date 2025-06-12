const net = require('net');

const server = net.createServer((socket) => {
  console.log('Cliente conectado');

  socket.on('data', (data) => {
    console.log('Recebido:', data.toString());
  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
  });

  socket.on('error', (err) => {
    console.error('Erro no socket:', err);
  });
});

server.listen(9000, () => {
  console.log('Servidor TCP escutando na porta 9000');
});

server.on('error', (err) => {
  console.error('Erro no servidor TCP:', err);
});
