import { theme } from './';
import { ChakraProvider } from '@chakra-ui/react';

export const AppTheme = ({children}) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}
