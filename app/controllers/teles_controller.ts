import type { HttpContext } from '@adonisjs/core/http';
import { spawn } from 'child_process'

export default class TeleController {
  public async sendNotification({ response }: HttpContext) {
    // Menjalankan tele_bot.py menggunakan spawn
    const pythonProcess = spawn('python', ['./tele_bot.py'])

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)  
    })

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        return response.status(200).json({ status: 'success', message: 'Notification sent successfully.' })
      } else {
        return response.status(500).json({ status: 'error', message: `Process exited with code ${code}` })
      }
    })
  }
}
