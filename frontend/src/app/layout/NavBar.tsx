import React from 'react';
import { Box, Container, Link, Stack, Text } from '@chakra-ui/react';

export const NavBar: React.FC = () => {
  const currentLocation = (): string => {
    return window.location.hash.replace(/^#/, '') || '/';
  };

  return (
    <Box backgroundColor="white" boxShadow="md">
      <Container maxWidth="9xl">
        <Stack
          alignItems="center"
          as="nav"
          direction="row"
          justifyContent="space-between"
          paddingY={3}
        >
          <Text fontSize="3xl">BrawlSpace</Text>

          <Link href="/" visibility={currentLocation() === '/' ? 'hidden' : 'visible'}>
            <Text fontSize="3xl">Go Back</Text>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
