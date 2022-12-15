import React, { useState } from 'react';
import {
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
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useLocation } from 'wouter';

import { useForm } from '@/app/hooks/useForm';
import findId from '@/assets/findId.jpg';

interface FormData {
  brawlhallaId: string;
}

const formData = {
  brawlhallaId: '',
};

const formValidations = {
  brawlhallaId: [
    (value: string) => value.length === 7 && !isNaN(Number(value)),
    'Id must be 7 digit long.',
  ],
};

const HomeForm: React.FC = () => {
  const { brawlhallaId, brawlhallaIdValid, isFormValid, onInputChange } = useForm<FormData>(
    formData,
    formValidations,
  );
  const [isFormSubmitted, setFormSubmitted] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useLocation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    setLocation(`/search?q=${brawlhallaId}`);
  };

  return (
    <form id="brawlIdForm" onSubmit={handleSubmit}>
      <FormControl isInvalid={isFormSubmitted && !isFormValid ? true : false} mt="2em">
        <InputGroup size="md">
          <Input
            isRequired
            bg="gray.100"
            name="brawlhallaId"
            placeholder="Insert your Brawlhalla Id"
            pr="4.5rem"
            value={brawlhallaId}
            onChange={(ev) => onInputChange(ev)}
          />
          <InputRightElement width="4.5rem">
            <Popover strategy="fixed" trigger="hover">
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
        <FormErrorMessage>{brawlhallaIdValid}</FormErrorMessage>
      </FormControl>
    </form>
  );
};

export default HomeForm;
