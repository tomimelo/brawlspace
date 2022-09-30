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

export class PlayersService {
  public constructor (private readonly steamClient: SteamClient) {}

  public async searchPlayers (q: string, options: SearchOptions): Promise<SearchResults<ReadonlyArray<SteamUser>>> {
    return await this.steamClient.searchPlayers(q, options)
  }
}
