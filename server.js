import { Server } from 'socket.io';
import { createServer } from 'http';

// Membuat HTTP server
const server = createServer();

// Menjalankan Socket.IO di server HTTP
const io = new Server(server, {
  cors: {
    origin: true, // Izinkan semua origin untuk pengujian
  },
});

// Menangani koneksi dari klien
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Mengirim pesan ke klien
  socket.emit('message', 'Hello from WebSocket server!');

  // Menerima pesan dari klien
  socket.on('message', (data) => {
    console.log(`Received from client: ${data}`);
    socket.emit('message', `Server received: ${data}`);
  });

  // Menangani pemutusan koneksi
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Menjalankan server di port 3333
const PORT = 6969;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
