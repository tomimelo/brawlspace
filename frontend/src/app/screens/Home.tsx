import { Button, Container, Flex, Image, Stack } from '@chakra-ui/react';

import HomeForm from '../components/HomeForm';

import logo from '@/assets/logo.png';

const Home: React.FC = () => {
  return (
    <Flex alignItems="center" bg="blue.800" flex={1} justifyContent="center" maxHeight="100vh">
      <Container p={8}>
        <Stack direction="column" spacing={6}>
          <Image src={logo} />

          <HomeForm />

          <Button form="brawlIdForm" type="submit">
            Search
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Home;
