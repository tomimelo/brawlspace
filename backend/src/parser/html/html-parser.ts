import { ValidationError } from 'mad-error'
import { SteamUser } from '../../steam/steam-user'
import { Parser } from '../parser'

export class HtmlParser implements Parser<string> {
  public parseUsers (data: string): ReadonlyArray<SteamUser> {
    const normalizedHtml = data.replace(/\r|\n|\t/g, '')
    const searchRows = this.getUsersRawDataRows(normalizedHtml)
    return searchRows.map(searchRow => {
      const avatarRegex = /<div class="avatarMedium"><a href="([^<]+)"><img src="([^<]+)"><\/a><\/div>/
      const personaInfoRegex = /<div class="searchPersonaInfo"><a class="searchPersonaName" href="[^<]+">([^<]+)<\/a><br \/>(?:(.*)<br \/>)?(?:(.*)&nbsp;)?(?:<img.*src="([^<"]+)")?(?:(?!\/div).)*<\/div>/
      const [, url, image] = searchRow.match(avatarRegex) || []
      const [, alias, name, locationDescription, countryFlag] = searchRow.match(personaInfoRegex) || []
      return {
        url,
        alias,
        image,
        ...(name && { name }),
        ...(locationDescription && {
          location: {
            description: locationDescription,
            image: countryFlag
          }
        })
      }
    })
  }

  private getUsersRawDataRows (html: string): ReadonlyArray<string> {
    const searchRowRegex = /<div class="search_row"(?:(?!search_row).)*<\/div>/g
    const searchRows = html.match(searchRowRegex)
    if (!searchRows) {
      throw new ValidationError('No matches found in provided HTML')
    }
    return searchRows
  }
}