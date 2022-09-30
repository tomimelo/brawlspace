import { SearchResults } from '../../src/players/players-service'
import { SteamClient } from '../../src/steam/steam-client'
import { SteamUser } from '../../src/steam/steam-user'

export class MockSteamClient extends SteamClient {
  public constructor (private mockUsers: ReadonlyArray<SteamUser>) {
    super({ apiKey: '' })
  }

  public async searchPlayers (q: string): Promise<SearchResults<ReadonlyArray<SteamUser>>> {
    return {
      total: this.mockUsers.length,
      page: 1,
      results: this.mockUsers
    }
  }
}
