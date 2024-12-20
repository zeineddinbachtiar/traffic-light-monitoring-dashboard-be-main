import { WsContextContract } from '@adonisjs/websocket'

export default class ChatController {
    // Event ini akan dipicu setiap kali klien mengirimkan pesan
    public async onMessage({ socket }: WsContextContract, message: string) {
        console.log('Pesan diterima:', message)
        
        // Kirimkan pesan ke semua klien yang terhubung
        socket.broadcastToAll('message', message)
    }

    // Kamu bisa menambahkan logika lainnya seperti menangani koneksi dan disconnect
    public async onConnect({ socket }: WsContextContract) {
        console.log('Klien terhubung:', socket.id)
    }

    public async onDisconnect({ socket }: WsContextContract) {
        console.log('Klien terputus:', socket.id)
    }
}
