import React, { useState } from 'react';
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

import { useForm } from '@/app/hooks/useForm';
import logo from '@/assets/logo.png';
import findId from '@/assets/findId.jpg';

interface FormData {
  brawlhallaId: string;
}

const Home: React.FC = () => {
  const { brawlhallaId, onInputChange } = useForm<FormData>({ brawlhallaId: '' });
  const [isFormSubmitted, setFormSubmitted] = useState<boolean>(false);

  const isFormValid = (): boolean => {
    if (brawlhallaId.length === 6 && !isNaN(Number(brawlhallaId))) {
      return true;
    }

    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid()) return;
    console.log('hola');
  };

  return (
    <Flex alignItems="center" bg="blue.800" flex={1} justifyContent="center" maxHeight="100vh">
      <Container borderRadius={9} height="700px" p={8} width="600px">
        <Stack direction="column" spacing={6}>
          <Image src={logo} />
          <form id="brawlIdForm" onSubmit={handleSubmit}>
            <FormControl isInvalid={isFormSubmitted && !isFormValid() ? true : false}>
              <InputGroup size="md">
                <Input
                  isRequired
                  bg="gray.100"
                  name="brawlhallaId"
                  placeholder="Brawlhalla Id"
                  pr="4.5rem"
                  value={brawlhallaId}
                  onChange={(ev) => onInputChange(ev)}
                />
                <InputRightElement width="4.5rem">
                  <Popover trigger="hover">
                    <PopoverTrigger>
                      <InfoOutlineIcon cursor="pointer" />
                    </PopoverTrigger>
                    <PopoverContent bg="black" borderColor="blue.800" color="white">
                      <PopoverArrow bg="black" />
                      <PopoverHeader>Find your Brawlhalla Id in your inventory!</PopoverHeader>
                      <PopoverBody>
                        <Image src={findId} />
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Form must be 6 digit long.</FormErrorMessage>
            </FormControl>
          </form>
          <Button form="brawlIdForm" type="submit">
            Search
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Home;
