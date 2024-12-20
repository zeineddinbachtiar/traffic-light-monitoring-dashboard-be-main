  // server.js
  import { WebSocketServer } from 'ws';
  import { createServer } from 'http';

  // Membuat HTTP server
  const server = createServer();

  // Membuat WebSocket server di atas HTTP server
  const wss = new WebSocketServer({ server });

  // Menangani koneksi WebSocket
  wss.on('connection', (ws) => {
    console.log('A client connected');

    // Menerima pesan dari klien
    ws.on('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message); // Parsing pesan JSON
        console.log('Received from client:', parsedMessage);

        // Periksa jenis pesan
        if (parsedMessage.type === 'ecg') {
          console.log('ECG Data:', parsedMessage.data);

          // Kirim kembali data dalam format JSON
          ws.send(JSON.stringify({ type: 'ecg', data: parsedMessage.data }));
        } else {
          console.log('Unknown message type:', parsedMessage.type);
        }
      } catch (err) {
        console.error('Error processing message:', err);
        ws.send(JSON.stringify({ error: 'Invalid data format' }));
      }
    });

    // Menangani pemutusan koneksi
    ws.on('close', () => {
      console.log('A client disconnected');
    });

    // Menangani error
    ws.on('error', (err) => {
      console.error('WebSocket error: ', err);
    });
  });

  // Menjalankan HTTP server pada port 6969
  const PORT = 6969;
  server.listen(PORT, () => {
    console.log(`WebSocket server is running o  n ws://localhost:${PORT}`);
  });
