import { MadRouter } from 'mad-server'
import { playersRoutes } from './players.routes'

export const apiRouter = new MadRouter({
  basePath: '/api',
  name: 'API',
  handlers: [playersRoutes],
})
