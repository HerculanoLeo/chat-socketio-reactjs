import { FC } from 'react';

export default class AppRouteModel {
  id!: string;
  path!: string;
  element!: FC;
  roles?: string[];
}
