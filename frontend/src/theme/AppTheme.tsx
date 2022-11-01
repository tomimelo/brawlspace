import { ChakraProvider } from '@chakra-ui/react';

import { brawlSpaceTheme } from './';

interface Props {
  children: React.ReactNode;
}

export const AppTheme: React.FC<Props> = ({ children }) => {
  return <ChakraProvider theme={brawlSpaceTheme}>{children}</ChakraProvider>;
};
