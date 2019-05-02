import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

interface JwtToken { // todo
  accessToken: string;
  accessTokenExpiration: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  get isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  constructor(private authService: AuthService, private router: Router) {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
  }, { updateOn: 'blur' });
  }

  login() {
    const val = this.form.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe(
          token => {
            this.authService.setSession(token as JwtToken);
            console.log(token);
            this.router.navigateByUrl('manage');
          },
          err => {
            console.log('nie z loginu');
            console.warn(err);
          }
        );
    }
  }

  logout() {
    this.authService.logout();
  }

}
