import router from '@adonisjs/core/services/router';
import { HttpContext } from '@adonisjs/core/http';

import { middleware } from './kernel.js';
import authRoutes from './routes/v1/auth.js';
import zoneRoutes from './routes/v1/zones.js';
import regionsRoutes from './routes/v1/regions.js';
import statusesRoutes from './routes/v1/statuses.js';
import devicesRoutes from './routes/v1/devices.js';
import usersRoutes from './routes/v1/user.js';
import dashboardRoutes from './routes/v1/dashboard.js';
import teleRoutes from './routes/v1/notifications.js';  // Import route for notification

// Rute utama untuk mengecek koneksi API
router.get('/', async ({ response }: HttpContext) => {
  response.status(200).json({
    status: 200,
    message: 'Welcome to SMBRICast by Agus Darmawan',
  });
});

// Grup rute untuk API versi 1
router.group(() => {
  // Rute otentikasi
  authRoutes();

  // Rute status
  statusesRoutes();

  // Rute lainnya dengan proteksi middleware
  router.group(() => {
    router.group(() => {
      router.group(() => {
        dashboardRoutes(); // Rute dashboard untuk statistik
        zoneRoutes(); // Rute zona
        regionsRoutes(); // Rute wilayah
        devicesRoutes(); // Rute perangkat
        usersRoutes(); // Rute pengguna
      }).middleware(middleware.roleMiddleware('admin')); // Hanya admin
    }).middleware(middleware.verifiedEmail()); // Harus email terverifikasi

    teleRoutes();
  });

}).prefix('/api/v1');