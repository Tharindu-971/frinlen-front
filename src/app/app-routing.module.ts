import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './protected/register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './protected/profile/profile.component';
import { BoardUserComponent } from './protected/board-user/board-user.component';
import { BoardModeratorComponent } from './protected/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './protected/board-admin/board-admin.component';

const routes: Routes = [
  //{ path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'protected',
    loadChildren: () =>
      import('./protected/protected.module').then((m) => m.ProtectedModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
