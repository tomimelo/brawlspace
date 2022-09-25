import { MadRouter, MadRouteMethod } from 'mad-server'
import { PlayersController } from '../controllers/players.controller'

const playersController = new PlayersController()

export const playersRoutes = new MadRouter({
  basePath: 'players',
  name: 'PlayersController',
  handlers: [
    {
      method: MadRouteMethod.GET,
      path: '/search',
      handler: playersController.searchPlayer
    },
  ]
})