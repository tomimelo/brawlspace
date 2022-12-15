import { MadRoute, MadRouteMethod, MadRouter } from 'mad-server'
import exceptionHandler from '../middlewares/exceptionHandler'
import { playersRoutes } from './players.routes'

const notFoundRoute: MadRoute = {
  method: MadRouteMethod.ALL,
  path: '*',
  handler: exceptionHandler.notFound
}

export const apiRouter = new MadRouter({
  basePath: '/api',
  name: 'API',
  handlers: [playersRoutes, notFoundRoute],
  postMiddlewares: [
    exceptionHandler.internal
  ]
})
