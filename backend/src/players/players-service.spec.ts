import { expect } from 'chai'
import { MockSteamClient } from '../../test/mocks/mock-steam-client'
import { SteamClient } from '../steam/steam-client'
import { PlayersService } from './players-service'

describe(PlayersService.name, () => {
  let playersService: PlayersService
  let steamClient: SteamClient
  const player1 = {
    id: '1',
    nickname: 'some-player-1',
    url: 'http://player-profile.com'
  }
  const player2 = {
    id: '2',
    nickname: 'some-player-2',
    url: 'http://player-profile.com'
  }
  const player3 = {
    id: '3',
    nickname: 'some-player-3',
    url: 'http://player-profile.com'
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
