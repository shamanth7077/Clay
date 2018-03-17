import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Users } from 'app/users/users.component';
import { Doors } from 'app/doors/doors.component';
import { Events } from 'app/events/events.component';

const appRoutes: Routes = [
  { path: 'users', component: Users},
  { path: 'doors', component: Doors},
  { path: 'events', component: Events},   
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  { path: '**', component: Users }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true});
export const childRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);