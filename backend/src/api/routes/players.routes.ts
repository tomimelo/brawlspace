import { MadRouter, MadRouteMethod } from 'mad-server'
import config from 'config'
import { PlayersService } from '../../players/players-service'
import { SteamClient } from '../../steam/steam-client'
import { PlayersController } from '../../players/players-controller'
import { AppConfig } from '../../config'
import { HtmlParser } from '../../parser/html/html-parser'
import { BrawlhallaClient } from '../../brawlhalla/brawlhalla-client'

const htmlParser = new HtmlParser()

const steamClientConfig = config.get<AppConfig['steam']>('steam')
const steamClient = new SteamClient(steamClientConfig, htmlParser)

const brawlhallaClientConfig = config.get<AppConfig['brawlhalla']>('brawlhalla')
const brawlhallaClient = new BrawlhallaClient(brawlhallaClientConfig)

const playersService = new PlayersService(steamClient, brawlhallaClient)
const playersController = new PlayersController(playersService)

export const playersRoutes = new MadRouter({
  basePath: 'players',
  name: 'PlayersController',
  handlers: [
    {
      method: MadRouteMethod.GET,
      path: '/search',
      handler: playersController.searchPlayers
    },
    {
      method: MadRouteMethod.GET,
      path: '/:steamId',
      handler: playersController.getPlayer
    }
  ]
})
