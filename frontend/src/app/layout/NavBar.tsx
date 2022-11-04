import React from 'react';
import { Box, Button, Container, Image, Stack, Text } from '@chakra-ui/react';
import { useLocation, Link } from 'wouter';
import { ArrowBackIcon } from '@chakra-ui/icons';

import brawlspace from '@/assets/brawlspace.png';

export const NavBar: React.FC = () => {
  const [location] = useLocation();

  return (
    <Box backgroundColor="black" boxShadow="md">
      <Container maxWidth="9xl">
        <Stack
          alignItems="center"
          as="nav"
          direction="row"
          justifyContent="space-between"
          paddingY={3}
        >
          <Image src={brawlspace} />

          <Link href="/">
            <Button visibility={location === '/' ? 'hidden' : 'visible'}>
              <ArrowBackIcon ml={-1} mr={2} />
              Go Back
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
