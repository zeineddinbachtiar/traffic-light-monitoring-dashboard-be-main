import { Server } from 'socket.io';

export default class SocketService {
  private static io: Server | null = null;

  public static boot(httpServer: any) {
    if (SocketService.io) return SocketService.io; // Return instance jika sudah ada

    // Menjalankan Socket.IO dengan konfigurasi CORS
    SocketService.io = new Server(httpServer, {
      cors: {
        origin: true,  // Izinkan koneksi dari semua origin (ganti sesuai kebutuhan)
      },
    });

    SocketService.io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Kirim pesan ke client setelah koneksi
      socket.emit('message', 'Hello from WebSocket server!');

      // Menerima pesan dari client
      socket.on('message', (data: string) => {
        console.log('Received from client:', data);
        socket.emit('message', `Server received: ${data}`);
      });

      // Menangani event disconnect
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    return SocketService.io;
  }

  public static getInstance() {
    return SocketService.io;
  }
}
