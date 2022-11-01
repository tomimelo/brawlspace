export interface AppConfig {
  env: string
  api: {
    port: number
  }
  db: {
    host: string
    port: number
    user: string
    password: string
    options: any
  }
  brawlhalla: {
    apiKey: string
  }
  steam: {
    apiKey: string
  }
  logger: {
    level: string
  }
}
