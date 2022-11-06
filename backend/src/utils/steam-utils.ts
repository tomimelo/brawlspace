export class SteamUtils {
  public static isSteamID(value: string): boolean {
    return /^STEAM_[10]:[10]:\d+$/.test(value)
  }

  public static isSteamID3(value: string): boolean {
    return /^\[?U:[10]:\d+\]?$/.test(value)
  }

  public static isSteamID64(value: string): boolean {
    return /^\d{17}$/.test(value)
  }

  public static isCustomUrl(value: string): boolean {
    return /^https?:\/\/steamcommunity\.com\/id\/(.+)$/.test(value)
  }

  public static isProfileUrl(value: string): boolean {
    return /^https?:\/\/steamcommunity\.com\/profiles\/(\d{17})$/.test(value)
  }

  public static toSteamID64(value: string): string {
    let steamId: string = value
    if (this.isSteamID3(value)) {
      steamId = this.fromSteamID3(value)
    }

    if (!this.isSteamID(value)) {
      throw new Error('The value provided is not a valid Steam ID')
    }

    const v = BigInt('76561197960265728')
    const [, y, z] = steamId.split(':')

    return (BigInt(Number(z) * 2) + v + y).toString()
  }

  private static fromSteamID3(value: string): string {
    const [, , w] = value.split(':')
    const reduced = Number(w.substring(0, w.length - 1))
    return 'STEAM_0:' + (reduced % 2) + ':' + Math.floor(reduced / 2)
  }
}
