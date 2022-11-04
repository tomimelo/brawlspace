import { useEffect, useState } from 'react';
import { Center, CircularProgress, Container, Flex, Stack, Text } from '@chakra-ui/react';

import api from '@/player/api';
import { LegendStats, PlayerRanked, PlayerStats } from '@/player/types';
import PlayerCard from '@/player/components/PlayerCard';
import LegendCard from '@/player/components/LegendCard';
import LegendsTable from '@/player/components/LegendsTable';

const Search: React.FC = () => {
  const [status, setStatus] = useState<'pending' | 'resolved' | 'rejected'>('pending');
  const [player, setPlayer] = useState<PlayerRanked>();
  const [playerStats, setPlayerStats] = useState<PlayerStats>();

  const query: string = window.location.search.slice(3);

  useEffect(() => {
    Promise.all([api.getRanked(query), api.getStats(query)])
      .then(([rankedResults, statsResults]) => {
        setPlayer(rankedResults);
        setPlayerStats(statsResults);
        setStatus('resolved');
      })
      .catch(() => {
        setStatus('rejected');
      });
  }, [query]);

  const getFavoriteLegend = (playerStats: PlayerStats): LegendStats => {
    const favoriteLegend = playerStats.legends.reduce((prev, current): LegendStats => {
      return prev.games > current.games ? prev : current;
    });

    return favoriteLegend;
  };

  return (
    <>
      <Center paddingY={6}>
        <Container maxWidth="9xl">
          {status === 'pending' && (
            <Flex alignItems="center" justifyContent="center" paddingY="12">
              <CircularProgress isIndeterminate color="primary.400" />
            </Flex>
          )}
          {status === 'rejected' && (
            <Flex alignItems="center" justifyContent="center" paddingY="12">
              <Text>There was an error loading data, does your id exists?</Text>
            </Flex>
          )}
          {player && playerStats && (
            <Flex>
              <Container maxWidth="8xl">
                <Stack direction="row" justifyContent="space-around" spacing={6}>
                  <PlayerCard player={player} playerStats={playerStats} />
                  <LegendCard legend={getFavoriteLegend(playerStats)} />
                </Stack>

                <LegendsTable legends={player.legends} />
              </Container>
            </Flex>
          )}
        </Container>
      </Center>
    </>
  );
};

export default Search;
