import { Box, Stack, Text } from '@chakra-ui/react';

import { PlayerRanked, PlayerStats } from '../types';

import 'animate.css';
import getTierColor from '@/helpers/';

type Props = {
  player: PlayerRanked;
  playerStats: PlayerStats;
};

const PlayerCard: React.FC<Props> = ({ player, playerStats }) => {
  const { name, tier, region, wins, rating, peak_rating } = player;

  return (
    <Box
      borderRadius="md"
      boxShadow="md"
      className="card animate__animated animate__fadeInLeft"
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
            color="teal.400"
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {name}
          </Text>

          <Text color="gray.300">Level: {playerStats?.level}</Text>
        </Stack>

        <Text
          color={getTierColor(tier)}
          display="block"
          fontSize="md"
          fontWeight="semibold"
          lineHeight="normal"
        >
          {tier}
        </Text>

        <Stack>
          <Stack alignItems="center" direction="row" justifyContent="space-between">
            <Text color="whiteAlpha.700" display="block" fontSize="md" lineHeight="normal" my={1}>
              Region: {region}
            </Text>
            <Text color="whiteAlpha.700" display="block" fontSize="md" lineHeight="normal" my={1}>
              Ranked Wins: {wins}
            </Text>
          </Stack>

          <Stack alignItems="center" direction="row" spacing={6}>
            <Text color="whiteAlpha.700">Rating: {rating}</Text>
            <Text color="whiteAlpha.700">Peak Rating: {peak_rating}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PlayerCard;
