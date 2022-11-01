import { Route } from 'wouter';

import Home from '@/app/screens/Home';

export const AppRouter = () => {
  return (
    <Route path="/">
      <Home />
    </Route>
  );
};
