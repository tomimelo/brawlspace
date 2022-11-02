import { Route } from 'wouter';

import Home from '@/app/screens/Home';
import Search from '@/app/screens/Search';

export const AppRouter = () => {
  return (
    <>
      <Route component={Home} path="/" />
      <Route component={Search} path="/search" />
    </>
  );
};
