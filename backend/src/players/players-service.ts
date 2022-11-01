import { SteamExplorer, SteamUser, FindOptions, FindResults } from 'steam-explorer'
import { BrawlhallaClient } from '../brawlhalla/brawlhalla-client'

export class PlayersService {
  public constructor(private readonly steamExplorer: SteamExplorer, private readonly brawlhallaClient: BrawlhallaClient) {}

  public async searchPlayers(q: string, options: FindOptions): Promise<FindResults<SteamUser>> {
    return this.steamExplorer.findUsers(q, options)
  }

  public async getPlayer(steamId: string): Promise<any> {
    return this.brawlhallaClient.searchPlayerBySteamId(steamId)
  }
}
