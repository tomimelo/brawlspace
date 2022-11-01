import { SteamExplorer, SteamUser } from 'steam-explorer'
import { BrawlhallaClient } from '../brawlhalla/brawlhalla-client'

export interface SearchOptions {
  page: number
}

export interface SearchResults<T> {
  total: number
  results: ReadonlyArray<T>
  page: number
}

export class PlayersService {
  public constructor(private readonly steamExplorer: SteamExplorer, private readonly brawlhallaClient: BrawlhallaClient) {}

  public async searchPlayers(q: string, options: SearchOptions): Promise<SearchResults<SteamUser>> {
    return this.steamExplorer.findUsers(q, options)
  }

  public async getPlayer(steamId: string): Promise<any> {
    return this.brawlhallaClient.searchPlayerBySteamId(steamId)
  }
}
