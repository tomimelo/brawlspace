import { ValidationError } from 'mad-error'
import { AvatarInfo, SteamUser, UserInfo } from '../../steam/steam-user'
import { Parser } from '../parser'

export class HtmlParser implements Parser<string> {
  public parseUsers (data: string): ReadonlyArray<SteamUser> {
    const normalizedHtml = data.replace(/\r|\n|\t/g, '')
    const searchRows = this.getUsersRawDataRows(normalizedHtml)
    return searchRows.map(searchRow => this.parseUser(searchRow))
  }

  private parseUser (html: string): SteamUser {
    const { url, image } = this.parseAvatarInfo(html)
    const { alias, name, location } = this.parseUserInfo(html)
    return {
      url,
      alias,
      image,
      ...(name && { name }),
      ...(location && { location })
    }
  }

  private parseAvatarInfo (html: string): AvatarInfo {
    const avatarRegex = /<div class="avatarMedium"><a href="([^<]+)"><img src="([^<]+)"><\/a><\/div>/
    const avatarMatch = html.match(avatarRegex)
    if (!avatarMatch) this.throwNoMatchFoundError()
    const [, url, image] = avatarMatch
    return {
      url,
      image
    }
  }

  private parseUserInfo (html: string): UserInfo {
    const userInfoRegex = /<div class="searchPersonaInfo"><a class="searchPersonaName" href="[^<]+">([^<]+)<\/a><br \/>(?:(.*)<br \/>)?(?:(.*)&nbsp;)?(?:<img.*src="([^<"]+)")?(?:(?!\/div).)*<\/div>/
    const userInfoMatch = html.match(userInfoRegex)
    if (!userInfoMatch) this.throwNoMatchFoundError()
    const [, alias, name, locationDescription, countryFlag] = userInfoMatch
    return {
      alias,
      ...(name && { name }),
      ...(locationDescription && {
        location: {
          description: locationDescription,
          image: countryFlag
        }
      })
    }
  }

  private getUsersRawDataRows (html: string): ReadonlyArray<string> {
    const searchRowRegex = /<div class="search_row"(?:(?!search_row).)*<\/div>/g
    const searchRows = html.match(searchRowRegex)
    if (!searchRows) this.throwNoMatchFoundError()
    return searchRows
  }

  private throwNoMatchFoundError (): never {
    throw new ValidationError('No matches found in provided HTML')
  }
}
