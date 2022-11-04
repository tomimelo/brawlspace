import React from 'react';
import { Flex } from '@chakra-ui/react';

import { NavBar } from './NavBar';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex backgroundColor="#c7d5e0" direction="column" flex={1}>
      <NavBar />

      {children}
    </Flex>
  );
};

export default Layout;
