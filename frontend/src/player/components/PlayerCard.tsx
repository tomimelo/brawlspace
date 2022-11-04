import { Box, Stack, Text } from '@chakra-ui/react';

import { PlayerRanked, PlayerStats } from '../types';

type Props = {
  player: PlayerRanked;
  playerStats: PlayerStats;
};

const PlayerCard: React.FC<Props> = ({ player, playerStats }) => {
  return (
    <Box
      bgColor="white"
      borderRadius="md"
      boxShadow="md"
      display={{ md: 'flex' }}
      margin={2}
      maxWidth="32rem"
      p={4}
    >
      <Stack
        align={{ base: 'center', md: 'stretch' }}
        justifyContent="space-between"
        mt={{ base: 4, md: 0 }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Text
            color="teal.600"
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {player.name}
          </Text>

          <Text color="gray.500">Level: {playerStats?.level}</Text>
        </Stack>

        <Text display="block" fontSize="md" fontWeight="semibold" lineHeight="normal">
          {player.tier}
        </Text>

        <Stack>
          <Stack alignItems="center" direction="row" justifyContent="space-between">
            <Text display="block" fontSize="md" lineHeight="normal" my={1}>
              Region: {player.region}
            </Text>
            <Text display="block" fontSize="md" lineHeight="normal" my={1}>
              Ranked Wins:{player.wins}
            </Text>
          </Stack>

          <Stack alignItems="center" direction="row" spacing={6}>
            <Text color="gray.500">Rating: {player.rating}</Text>
            <Text color="gray.500">Peak Rating: {player.peak_rating}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PlayerCard;
