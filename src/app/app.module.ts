import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './protected/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './protected/profile/profile.component';
import { BoardAdminComponent } from './protected/board-admin/board-admin.component';
import { BoardModeratorComponent } from './protected/board-moderator/board-moderator.component';
import { BoardUserComponent } from './protected/board-user/board-user.component';

import { authInterceptorProviders } from './protected/_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule,ReactiveFormsModule, HttpClientModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
