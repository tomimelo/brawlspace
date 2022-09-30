export interface SteamUser {
  url: string;
  name?: string;
  alias: string;
  image: string;
  location?: {
    description: string;
    image: string;
  }
}
