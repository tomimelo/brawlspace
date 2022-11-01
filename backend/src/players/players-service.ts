import BrawlhallaAPI, { Player } from 'bhapi.js'
import { SteamExplorer, SteamUser, FindOptions, FindResults } from 'steam-explorer'

export class PlayersService {
  public constructor(private readonly steamExplorer: SteamExplorer, private readonly bhapi: BrawlhallaAPI) {}

  public async searchPlayers(q: string, options: FindOptions): Promise<FindResults<SteamUser>> {
    return this.steamExplorer.findUsers(q, options)
  }

  public async getPlayer(steamId: string): Promise<Player> {
    return this.bhapi.searchBySteamID(steamId)
  }
}
