export interface AvatarInfo {
  url: string,
  image: string
}

export interface UserInfo {
  alias: string,
  name?: string,
  location?: {
    description: string,
    image: string
  }
}

export type SteamUser = AvatarInfo & UserInfo
