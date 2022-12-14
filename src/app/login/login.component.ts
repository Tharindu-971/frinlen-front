import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../protected/_services/auth.service';
import { TokenStorageService } from '../protected/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.body.token);
        this.tokenStorage.saveUser(data.body);
        console.log('responsedata', data.body.token);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/protected/dashboard']);
        //this.reloadPage();
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
    //this.router.navigate(['/protected/dashboard']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
