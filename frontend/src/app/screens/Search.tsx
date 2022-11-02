import { useEffect, useState } from 'react';
import { CircularProgress, Container, Flex, Stack } from '@chakra-ui/react';

import api from '@/player/api';
import { LegendStats, PlayerRanked, PlayerStats } from '@/player/types';
import PlayerCard from '@/player/components/PlayerCard';
import LegendCard from '@/player/components/LegendCard';

type Props = {};

const Search: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [player, setPlayer] = useState<PlayerRanked | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    setIsLoading(true);
    api.getRanked().then((res) => {
      setPlayer(res);
    });
    api.getStats().then((res) => {
      setPlayerStats(res);
    });
    setIsLoading(false);
  }, []);

  const getFavoriteLegend = (): LegendStats | undefined => {
    const favoriteLegend = playerStats?.legends.reduce((prev, current): LegendStats => {
      return prev.games > current.games ? prev : current;
    });

    return favoriteLegend;
  };

  return isLoading ? (
    <Flex alignItems="center" justifyContent="center" paddingY="12">
      <CircularProgress isIndeterminate color="primary.400" />
    </Flex>
  ) : (
    <Flex>
      <Container maxWidth="8xl">
        <Stack direction="row" justifyContent="space-around" spacing={6}>
          <PlayerCard player={player} playerStats={playerStats} />
          <LegendCard legend={getFavoriteLegend()} />
        </Stack>
      </Container>
    </Flex>
  );
};

export default Search;
