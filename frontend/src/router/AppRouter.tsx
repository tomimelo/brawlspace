import { Route, Switch } from 'wouter';

import Home from '@/app/screens/Home';
import Search from '@/app/screens/Search';

export const AppRouter = () => {
  return (
    <>
      <Switch>
        <Route component={Home} path="/" />
        <Route component={Search} path="/search" />
        <Route>404, Not Found!</Route>
      </Switch>
    </>
  );
};
