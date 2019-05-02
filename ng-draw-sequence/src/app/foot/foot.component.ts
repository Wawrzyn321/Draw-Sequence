import { Component } from '@angular/core';
import { AuthService } from '../administration/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foot',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.css']
})
export class FootComponent {

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/couting-list');
  }

}
