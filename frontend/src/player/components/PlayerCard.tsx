import { Box, Stack, Text } from '@chakra-ui/react';

import { PlayerRanked, PlayerStats } from '../types';

type Props = {
  player: PlayerRanked | null;
  playerStats: PlayerStats | null;
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
        mt={{ base: 4, md: 0 }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Stack direction="row" justifyContent="space-between" spacing={6}>
          <Text
            color="teal.600"
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {player?.name}
          </Text>

          <Text color="gray.500">Level: {playerStats?.level}</Text>
        </Stack>

        <Text display="block" fontSize="md" fontWeight="semibold" lineHeight="normal" my={1}>
          {player?.tier}
        </Text>

        <Stack alignItems="center" direction="row" spacing={6}>
          <Text color="gray.500" my={2}>
            Rating: {player?.rating}
          </Text>
          <Text color="gray.500" my={2}>
            Peak Rating: {player?.peak_rating}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PlayerCard;
