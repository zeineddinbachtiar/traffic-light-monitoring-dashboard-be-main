const ZonesController = () => import('#controllers/zones_controller')
import router from '@adonisjs/core/services/router'

export default function zoneRoutes(){
    router.group(() => {
        router.get('/', [ZonesController, 'index'])
        router.post('/', [ZonesController,'store'])
        router.get('/:id', [ZonesController,'show'])
        router.patch('/:id', [ZonesController, 'update'])
        router.delete('/:id', [ZonesController, 'destroy'])
    }).prefix('/zones')
}