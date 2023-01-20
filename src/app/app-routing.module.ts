import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { SuspendedComponent } from './suspended/suspended.component';

const routes: Routes = [

  { path: 'login',component:LoginComponent},
  {
    path: 'protected',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {path:'',redirectTo:'login',pathMatch:'full'}

  // { path: 'suspend',component:SuspendedComponent},
  // {path:'**',redirectTo:'suspend',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
