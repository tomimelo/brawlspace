import React from 'react';
import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useLocation, Link } from 'wouter';

export const NavBar: React.FC = () => {
  const [location] = useLocation();

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

          <Link href="/">
            <Text
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
              fontSize="3xl"
              visibility={location === '/' ? 'hidden' : 'visible'}
            >
              Go Back
            </Text>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
