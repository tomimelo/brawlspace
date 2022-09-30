import { expect } from 'chai'
import { MockSteamClient } from '../../test/mocks/mock-steam-client'
import { SteamClient } from '../steam/steam-client'
import { PlayersService } from './players-service'

describe(PlayersService.name, () => {
  let playersService: PlayersService
  let steamClient: SteamClient
  const player1 = {
    id: '1',
    url: 'https://myprofile.com/profile-id',
    alias: 'Player 1',
    image: 'https://myprofile.com/my-image.jpg',
    name: 'PlayerName',
    location: {
      description: 'Argentina',
      image: 'https://myprofile.com/countryflags/ar.gif'
    }
  }
  const player2 = {
    id: '2',
    url: 'https://myprofile.com/profile-id',
    alias: 'Player 2',
    image: 'https://myprofile.com/my-image.jpg',
    location: {
      description: 'Spain',
      image: 'https://myprofile.com/countryflags/es.gif'
    }
  }
  const player3 = {
    id: '3',
    url: 'https://myprofile.com/profile-id',
    alias: 'Player 3',
    image: 'https://myprofile.com/my-image.jpg',
    name: 'PlayerName'
  }
  describe('searchPlayers', () => {
    beforeEach(() => {
      steamClient = new MockSteamClient([player1, player2, player3])
      playersService = new PlayersService(steamClient)
    })
    it('should return a list of players', async () => {
      const { results } = await playersService.searchPlayers('some-player', { page: 1 })
      const expectedResult = [player1, player2, player3]
      expect(results).to.deep.equal(expectedResult)
    })
  })
})
