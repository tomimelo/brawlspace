import { SteamClient } from '../steam/steam-client'

export interface SearchOptions {
  page: number
}

export interface SearchResults<T> {
  total: number,
  results: T,
  page: number
}

export interface Player {
  id: string,
  url: string,
  nickname: string
}

export class PlayersService {
  public constructor (private readonly steamClient: SteamClient) {}

  public async searchPlayers (q: string, options: SearchOptions): Promise<SearchResults<ReadonlyArray<Player>>> {
    return await this.steamClient.searchPlayers(q, options)
  }
}
