import { Box, Image, Stack, Text } from '@chakra-ui/react';

import { LegendStats } from '../types';
import 'animate.css';

type Props = { legend: LegendStats };

const LegendCard: React.FC<Props> = ({ legend }) => {
  const { legend_name_key, wins, kos, level, games } = legend;
  const legendImageUrl = `./src/assets/legends/${legend_name_key}.png`;

  return (
    <Box
      borderRadius="md"
      boxShadow="md"
      className="card animate__animated animate__fadeInRight"
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
            color="teal.400"
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            Favorite Legend
          </Text>

          <Image
            bg="brown"
            border="2px"
            borderColor="gold"
            height="70px"
            src={legendImageUrl}
            width="70px"
          />
        </Stack>

        <Text
          color="whiteAlpha.900"
          display="block"
          fontSize="lg"
          fontWeight="semibold"
          lineHeight="normal"
          textTransform="uppercase"
        >
          {legend_name_key}
        </Text>
        <Text
          color="whiteAlpha.800"
          display="block"
          fontSize="md"
          fontWeight="semibold"
          lineHeight="normal"
        >
          Games: {games}
        </Text>

        <Stack alignItems="center" direction="row" spacing={3}>
          <Text color="whiteAlpha.700">Wins: {wins}</Text>
          <Text color="whiteAlpha.700">Level: {level}</Text>
          <Text color="whiteAlpha.700">KOs: {kos}</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LegendCard;
