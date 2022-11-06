import BrawlhallaAPI, { Player } from 'bhapi.js'
import { SteamExplorer } from 'steam-explorer'
import { SteamUtils } from '../utils/steam-utils'

enum SearcheableValueType {
  SteamId = 'steamId',
  SteamId3 = 'steamId3',
  SteamId64 = 'steamId64',
  CustomUrl = 'customUrl',
  ProfileUrl = 'profileUrl',
  NoMatches = 'noMatches',
}

export class PlayersService {
  public constructor(private readonly steamExplorer: SteamExplorer, private readonly bhapi: BrawlhallaAPI) {}

  public async searchPlayer(q: string): Promise<Player> {
    const searchValueType = this.getSearchableValueType(q)
    const steamId64 = await this.extractSteamId64(searchValueType, q)
    return this.bhapi.searchBySteamID(steamId64)
  }

  public async getPlayer(steamId: string): Promise<Player> {
    return this.bhapi.searchBySteamID(steamId)
  }

  private getSearchableValueType(value: string): SearcheableValueType {
    const possibleTypes = [
      { type: SearcheableValueType.SteamId, validator: (value: string) => SteamUtils.isSteamID(value) },
      { type: SearcheableValueType.SteamId3, validator: (value: string) => SteamUtils.isSteamID3(value) },
      { type: SearcheableValueType.SteamId64, validator: (value: string) => SteamUtils.isSteamID64(value) },
      { type: SearcheableValueType.CustomUrl, validator: (value: string) => SteamUtils.isCustomUrl(value) },
      { type: SearcheableValueType.ProfileUrl, validator: (value: string) => SteamUtils.isProfileUrl(value) },
    ]

    for (const possibleType of possibleTypes) {
      if (possibleType.validator(value)) {
        return possibleType.type
      }
    }

    return SearcheableValueType.NoMatches
  }

  private async extractSteamId64(type: SearcheableValueType, value: string): Promise<string> {
    switch (type) {
      case SearcheableValueType.SteamId:
      case SearcheableValueType.SteamId3:
        return SteamUtils.toSteamID64(value)
      case SearcheableValueType.SteamId64:
        return value
      case SearcheableValueType.ProfileUrl:
        return SteamUtils.getMaybeIdFromUrl(value)
      case SearcheableValueType.CustomUrl:
        return this.steamExplorer.getSteamId(SteamUtils.getMaybeIdFromUrl(value))
      case SearcheableValueType.NoMatches:
      default:
        return this.steamExplorer.getSteamId(value)
    }
  }
}
