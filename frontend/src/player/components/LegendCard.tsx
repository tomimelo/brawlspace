import { Box, Image, Stack, Text } from '@chakra-ui/react';

import { LegendStats } from '../types';

type Props = { legend: LegendStats | undefined };

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
            {legend?.legend_name_key}
          </Text>

          <Image height="70px" src="https://bit.ly/dan-abramov" width="70px" />
        </Stack>

        <Text display="block" fontSize="md" fontWeight="semibold" lineHeight="normal" my={1}>
          Games: {legend?.games}
        </Text>

        <Stack alignItems="center" direction="row" spacing={6}>
          <Text color="gray.500" my={2}>
            Wins: {legend?.wins}
          </Text>
          <Text color="gray.500" my={2}>
            Level: {legend?.level}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LegendCard;
