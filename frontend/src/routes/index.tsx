import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import AppRouteModel from '../models/router/route.model';
import { applicationRoutes } from '../configurations/routes.configuration';
import { Suspense } from 'react';
import Layout from '../components/Layout';
import { useUser } from '../contexts/UserContext';
import WhoAreYou from '../pages/WhoAreYou';
import { useCookies } from 'react-cookie';

const createRoutes = (routes: AppRouteModel[] = []) => {
  return routes.map(({ id, path, element: Element }) => (
    <Route
      key={id}
      path={path}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <Element />
        </Suspense>
      }
    />
  ));
};

const Routes = () => {
  const [cookies] = useCookies();

  const { user } = useUser();

  if (cookies['username'] && !user) {
    return null;
  }

  return (
    <BrowserRouter>
      <RouterRoutes>
        {user ? (
          <>
            <Route
              path={'/'}
              element={<Layout />}
              children={createRoutes(applicationRoutes)}
            />
            <Route path={'*'} element={<NotFound />} />
          </>
        ) : (
          <Route path={'*'} element={<WhoAreYou />} />
        )}
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
