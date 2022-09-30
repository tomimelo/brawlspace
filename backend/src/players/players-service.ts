import { BrawlhallaClient } from '../brawlhalla/brawlhalla-client'
import { SteamClient } from '../steam/steam-client'
import { SteamUser } from '../steam/steam-user'

export interface SearchOptions {
  page: number
}

export interface SearchResults<T> {
  total: number,
  results: T,
  page: number
}

interface Player {
  alias: string
}

export class PlayersService {
  public constructor (private readonly steamClient: SteamClient, private readonly brawlhallaClient: BrawlhallaClient) {}

  public async searchPlayers (q: string, options: SearchOptions): Promise<SearchResults<ReadonlyArray<SteamUser>>> {
    return this.steamClient.searchPlayers(q, options)
  }

  public async getPlayer (steamId: string): Promise<any> {
    return this.brawlhallaClient.searchPlayerBySteamId(steamId)
  }
}
