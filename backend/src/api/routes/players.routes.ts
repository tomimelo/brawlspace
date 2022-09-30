import { MadRouter, MadRouteMethod } from 'mad-server'
import { PlayersService } from '../../players/players-service'
import { SteamClient } from '../../steam/steam-client'
import { PlayersController } from '../controllers/players.controller'

const steamClient = new SteamClient()
const playersService = new PlayersService(steamClient)
const playersController = new PlayersController(playersService)

export const playersRoutes = new MadRouter({
  basePath: 'players',
  name: 'PlayersController',
  handlers: [
    {
      method: MadRouteMethod.GET,
      path: '/search',
      handler: playersController.searchPlayers
    }
  ]
})
