import { WebSocketServer } from 'ws'
import { createServer } from 'http'
// import type { HttpContext } from '@adonisjs/core/http'
import { Application } from '@adonisjs/core/build/src/Application'
import { HttpServer } from '@adonisjs/core/build/src/Http/Server'

async function startServer() {  
  // Inisialisasi aplikasi AdonisJS
  const app = new Application(__dirname)
  await app.setup()

  // Mendapatkan instance HTTP server
  const httpServer = app.container.use('Adonis/Core/HttpServer') as HttpServer

  // Membuat server HTTP dari AdonisJS
  const server = createServer(httpServer.handleRequest.bind(httpServer))

  // Membuat WebSocket server di atas HTTP server
  const wss = new WebSocketServer({ server })

  // Menangani koneksi WebSocket
  wss.on('connection', (ws) => {
    console.log('A client connected')

    // Mengirim pesan ke klien saat koneksi terbuka
    ws.send('Hello from WebSocket server!')

    // Menerima pesan dari klien
    ws.on('message', (message: string) => {
      console.log(`Received from client: ${message}`)
      
      // Jika data ECG diterima, log dan kirim balasan
      try {
        const ecgData = JSON.parse(message) // Asumsi data dikirim dalam format JSON
        console.log('ECG Data:', ecgData)

        // Kirim balasan ke klien
        ws.send(`Server received ECG data: ${JSON.stringify(ecgData)}`)
      } catch (err) {
        console.error('Error processing message:', err)
        ws.send('Error: Invalid data format')
      }
    })

    // Menangani pemutusan koneksi
    ws.on('close', () => {
      console.log('A client disconnected')
    })

    // Menangani error
    ws.on('error', (err) => {
      console.error('WebSocket error: ', err)
    })
  })

  // Menjalankan server pada port 6969
  const PORT = 6969
  server.listen(PORT, () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT}`)
  })
}

// Mulai server
startServer().catch((err) => {
  console.error('Error starting the server:', err)
})
