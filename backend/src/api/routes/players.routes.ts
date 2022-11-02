import { MadRouter, MadRouteMethod } from 'mad-server'
import config from 'config'
import { PlayersService } from '../../players/players-service'
import { PlayersController } from '../../players/players-controller'
import { AppConfig } from '../../config'
import { SteamExplorer } from 'steam-explorer'
import BrawlhallaAPI from 'bhapi.js'

const { apiKey: steamApiKey } = config.get<AppConfig['steam']>('steam')
const steamExplorer = new SteamExplorer({ apiKey: steamApiKey })

const { apiKey: brawlhallaApiKey } = config.get<AppConfig['brawlhalla']>('brawlhalla')
const bhapi = new BrawlhallaAPI({ apiKey: brawlhallaApiKey })

const playersService = new PlayersService(steamExplorer, bhapi)
const playersController = new PlayersController(playersService)

export const playersRoutes = new MadRouter({
  basePath: 'players',
  name: 'PlayersController',
  handlers: [
    {
      method: MadRouteMethod.GET,
      path: '/search',
      handler: playersController.searchPlayers,
    },
    {
      method: MadRouteMethod.GET,
      path: '/:steamId',
      handler: playersController.getPlayer,
    },
  ],
})
