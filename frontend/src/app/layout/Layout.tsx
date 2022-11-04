import React from 'react';
import { Flex } from '@chakra-ui/react';

import { NavBar } from './NavBar';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex backgroundColor="gray.100" direction="column" flex={1}>
      <NavBar />

      {children}
    </Flex>
  );
};

export default Layout;
