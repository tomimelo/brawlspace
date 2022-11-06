import BrawlhallaAPI, { Player } from 'bhapi.js'
import { SteamExplorer, SteamUser, FindResults } from 'steam-explorer'

export class PlayersService {
  public constructor(private readonly steamExplorer: SteamExplorer, private readonly bhapi: BrawlhallaAPI) {}

  public async searchPlayer(q: string): Promise<FindResults<SteamUser>> {
    const searchValueType = this.getSearchValueType(q)
    return this.steamExplorer.findUsers(q)
  }

  public async getPlayer(steamId: string): Promise<Player> {
    return this.bhapi.searchBySteamID(steamId)
  }

  private getSearchValueType(value: string): string {
    const possibleTypes = [
      { type: 'steamId2', regex: /^STEAM_[10]:[10]:\d+$/ },
      { type: 'steamId3', regex: /^\[?U:[10]:\d+\]?$/ },
      { type: 'steamId64', regex: /^\d{17}$/ },
      { type: 'customUrl', regex: /^https?:\/\/steamcommunity\.com\/id\/(.+)$/ },
      { type: 'legacyUrl', regex: /^https?:\/\/steamcommunity\.com\/profiles\/(\d{17})$/ },
    ]

    for (const possibleType of possibleTypes) {
      if (value.match(possibleType.regex)) {
        return possibleType.type
      }
    }

    return ''
  }
}
