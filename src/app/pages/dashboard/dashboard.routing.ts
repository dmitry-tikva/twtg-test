import { Routes } from '@angular/router';

import { DashboardComponent } from './component/dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
