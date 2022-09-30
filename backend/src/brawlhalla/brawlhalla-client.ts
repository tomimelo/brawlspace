import axios, { AxiosInstance } from 'axios'
import { NotFoundError } from '../error/errors'

export interface BrawlhallaClientConfig {
  apiKey: string
}

interface BrawlhallaPlayer {
  brawlhalla_id: number,
  name: string
}

export class BrawlhallaClient {
  private apiClient: AxiosInstance
  public constructor (private readonly config: BrawlhallaClientConfig) {
    this.apiClient = axios.create({ baseURL: 'https://api.brawlhalla.com', params: { api_key: this.config.apiKey } })
  }

  public async searchPlayerBySteamId (steamId: string): Promise<BrawlhallaPlayer> {
    const { data } = await this.apiClient.get<BrawlhallaPlayer>('/search', {
      params: {
        steamid: steamId
      }
    })
    if (Array.isArray(data) || !data || !data.brawlhalla_id) {
      throw new NotFoundError('Player not found')
    }
    return data
  }
}
