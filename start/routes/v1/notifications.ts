import router from '@adonisjs/core/services/router'
const TeleController = () => import('#controllers/teles_controller')  // Pastikan nama file sesuai dengan nama controller

export default function teleRoutes() {
  // Menambahkan route untuk notifikasi
  router.get('/send-notification', [TeleController, 'sendNotification'])
}
