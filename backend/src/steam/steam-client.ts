import { SteamUser } from './steam-user'
import axios from 'axios'
import { SearchOptions, SearchResults } from '../players/players-service'

export class SteamClient {
  public constructor () {}

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
    const players = this.parseUsersFromHTML(html)
    return {
      total,
      page,
      results: players
    }
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

  private parseUsersFromHTML (html: string): ReadonlyArray<SteamUser> {
    const playerRegex = /<a class="searchPersonaName" href="([^>]*)">([^>]+)<\/a>/gm
    const matches = [...html.matchAll(playerRegex)]
    return matches.map(([match, url, nickname]) => {
      return {
        url,
        nickname
      }
    })
  }
}
