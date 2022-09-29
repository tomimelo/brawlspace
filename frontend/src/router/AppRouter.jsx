import { Route } from 'wouter';
import { SearchPage } from '../pages';

export const AppRouter = () => (
  <div>
    <Route path="/search" component={SearchPage} />
  </div>
);