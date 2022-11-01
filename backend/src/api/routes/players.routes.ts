import { MadRouter, MadRouteMethod } from 'mad-server'
import config from 'config'
import { PlayersService } from '../../players/players-service'
import { PlayersController } from '../../players/players-controller'
import { AppConfig } from '../../config'
import { BrawlhallaClient } from '../../brawlhalla/brawlhalla-client'
import { SteamExplorer } from 'steam-explorer'

const { apiKey: steamApiKey } = config.get<AppConfig['steam']>('steam')
const steamExplorer = new SteamExplorer({ apiKey: steamApiKey })

const brawlhallaClientConfig = config.get<AppConfig['brawlhalla']>('brawlhalla')
const brawlhallaClient = new BrawlhallaClient(brawlhallaClientConfig)

const playersService = new PlayersService(steamExplorer, brawlhallaClient)
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
