import AppRouteModel from '../models/router/route.model';
import { lazy } from 'react';

export const applicationRoutes: AppRouteModel[] = [
  {
    id: 'dashboard',
    path: '/',
    element: lazy(() => import('../pages/Dashboard')),
  },
  {
    id: 'room',
    path: 'room/:id',
    element: lazy(() => import('../pages/Room')),
  },
  {
    id: 'room',
    path: 'room/:id/edit',
    element: lazy(() => import('../pages/FormRoom/Edit')),
  },
  {
    id: 'create-room',
    path: 'room/create',
    element: lazy(() => import('../pages/FormRoom')),
  },
];
