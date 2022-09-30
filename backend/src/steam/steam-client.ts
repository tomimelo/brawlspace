import { SteamUser } from './steam-user'
import axios, { AxiosInstance } from 'axios'
import { SearchOptions, SearchResults } from '../players/players-service'
import { Parser } from '../parser/parser'

interface PlayersRawData {
  html: string,
  total: number
}
export interface SteamClientConfig {
  apiKey: string
}

export class SteamClient {
  private apiClient: AxiosInstance
  public constructor (private readonly config: SteamClientConfig, private readonly htmlParser: Parser<string>) {
    this.apiClient = axios.create({ baseURL: 'http://api.steampowered.com', params: { key: this.config.apiKey } })
  }

  public async searchPlayers (q: string, { page }: SearchOptions): Promise<SearchResults<ReadonlyArray<SteamUser>>> {
    const { html, total } = await this.fetchPlayersRawData(q, page)
    const players = this.htmlParser.parseUsers(html)
    const playersWithId = await Promise.all(players.map(async player => {
      const [maybeId, typeOfUrl] = player.url.split('/').reverse()
      const id = typeOfUrl === 'profiles'
        ? maybeId
        : await this.getSteamId(maybeId)
      return {
        id,
        ...player
      }
    }))
    return {
      total,
      page,
      results: playersWithId
    }
  }

  private async fetchPlayersRawData (q: string, page: number): Promise<PlayersRawData> {
    const cookie = await this.getCookie()
    if (!cookie) throw new Error('Cannot get cookie')
    const sessionId = this.getSessionIdFromCookie(cookie)
    const { data } = await axios.get(`https://steamcommunity.com/search/SearchCommunityAjax?text=${q}&filter=users&sessionid=${sessionId}&steamid_user=false&page=${page}`, {
      headers: {
        Cookie: cookie
      }
    })
    const { html, search_result_count: total } = data
    return {
      html,
      total
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
    return await Promise.all(matches.map(async ([match, url, alias]) => {
      const [maybeId, typeOfUrl] = url.split('/').reverse()
      const id = typeOfUrl === 'profiles'
        ? maybeId
        : await this.getSteamId(maybeId)
      return {
        id,
        url,
        alias,
        image: ''
      }
    }))
  }
}
