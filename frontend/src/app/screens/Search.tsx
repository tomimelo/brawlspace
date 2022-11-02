import { useEffect, useState } from 'react';
import { CircularProgress, Container, Flex, Stack, Text } from '@chakra-ui/react';

import api from '@/player/api';
import { LegendStats, PlayerRanked, PlayerStats } from '@/player/types';
import PlayerCard from '@/player/components/PlayerCard';
import LegendCard from '@/player/components/LegendCard';

type Props = {};

const Search: React.FC<Props> = () => {
  const [status, setStatus] = useState<'pending' | 'resolved' | 'rejected'>('pending');
  const [player, setPlayer] = useState<PlayerRanked>();
  const [playerStats, setPlayerStats] = useState<PlayerStats>();

  useEffect(() => {
    Promise.all([api.getRanked(), api.getStats()])
      .then(([rankedResults, statsResults]) => {
        setPlayer(rankedResults);
        setPlayerStats(statsResults);
        setStatus('resolved');
      })
      .catch(() => {
        setStatus('rejected');
      });
  }, []);

  const getFavoriteLegend = (playerStats: PlayerStats): LegendStats => {
    const favoriteLegend = playerStats.legends.reduce((prev, current): LegendStats => {
      return prev.games > current.games ? prev : current;
    });

    return favoriteLegend;
  };

  return (
    <>
      {status === 'pending' && (
        <Flex alignItems="center" justifyContent="center" paddingY="12">
          <CircularProgress isIndeterminate color="primary.400" />
        </Flex>
      )}
      {status === 'rejected' && (
        <Flex alignItems="center" justifyContent="center" paddingY="12">
          <Text>Hubo un error al cargar datos :(</Text>
        </Flex>
      )}
      {player && playerStats && (
        <Flex>
          <Container maxWidth="8xl">
            <Stack direction="row" justifyContent="space-around" spacing={6}>
              <PlayerCard player={player} playerStats={playerStats} />
              <LegendCard legend={getFavoriteLegend(playerStats)} />
            </Stack>
          </Container>
        </Flex>
      )}
    </>
  );
};

export default Search;
