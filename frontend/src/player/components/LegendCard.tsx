import { Box, Image, Stack, Text } from '@chakra-ui/react';

import { LegendStats } from '../types';

type Props = { legend: LegendStats };

const LegendCard: React.FC<Props> = ({ legend }) => {
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
            Favorite Legend
          </Text>

          <Image height="70px" src="https://bit.ly/dan-abramov" width="70px" />
        </Stack>

        <Text
          display="block"
          fontSize="lg"
          fontWeight="semibold"
          lineHeight="normal"
          textTransform="uppercase"
        >
          {legend.legend_name_key}
        </Text>
        <Text display="block" fontSize="md" fontWeight="semibold" lineHeight="normal">
          Games: {legend.games}
        </Text>

        <Stack alignItems="center" direction="row" spacing={3}>
          <Text color="gray.500">Wins: {legend.wins}</Text>
          <Text color="gray.500">Level: {legend.level}</Text>
          <Text color="gray.500">KOs: {legend.kos}</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LegendCard;
