import { SteamUser } from './steam-user'
import axios from 'axios'
import { SearchOptions, SearchResults } from '../players/players-service'

export interface SteamClientConfig {
  apiKey: string
}

export class SteamClient {
  private apiClient: any
  public constructor (private readonly config: SteamClientConfig) {
    this.apiClient = axios.create({ baseURL: 'http://api.steampowered.com', params: { key: this.config.apiKey } })
  }

  public async searchPlayers (q: string, options: SearchOptions): Promise<SearchResults<ReadonlyArray<SteamUser>>> {
    const cookie = await this.getCookie()
    if (!cookie) throw new Error('Cannot get cookie')
    const sessionId = this.getSessionIdFromCookie(cookie)
    const { page } = options
    const { data } = await axios.get(`https://steamcommunity.com/search/SearchCommunityAjax?text=${q}&filter=users&sessionid=${sessionId}&steamid_user=false&page=${page}`, {
      headers: {
        Cookie: cookie
      }
    })
    const { html, search_result_count: total } = data
    const players = await this.parseUsersFromHTML(html)
    return {
      total,
      page,
      results: players
    }
  }

  public async getSteamId (nickname: string): Promise<string> {
    const { data } = await this.apiClient.get(`/ISteamUser/ResolveVanityURL/v0001/?vanityurl=${nickname}`)
    if (data.response.success !== 1) {
      throw new Error('User not found')
    }
    return data.response.steamid
  }

  private async getCookie (): Promise<string | undefined> {
    const res = await axios.get('https://steamcommunity.com/')
    const [cookie] = res.headers['set-cookie'] || []
    return cookie
  }

  private getSessionIdFromCookie (cookie: string): string {
    const [session] = cookie.split(';')
    const [, sessionId] = session.split('=')
    return sessionId
  }

  private async parseUsersFromHTML (html: string): Promise<ReadonlyArray<SteamUser>> {
    const playerRegex = /<a class="searchPersonaName" href="([^>]*)">([^>]+)<\/a>/gm
    const matches = [...html.matchAll(playerRegex)]
    return await Promise.all(matches.map(async ([match, url, nickname]) => {
      const [maybeId, typeOfUrl] = url.split('/').reverse()
      const id = typeOfUrl === 'profiles'
        ? maybeId
        : await this.getSteamId(maybeId)
      return {
        id,
        url,
        nickname
      }
    }))
  }
}
