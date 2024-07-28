declare var google: any;

import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  
  ngOnInit() {
    google.accounts.id.initialize({
      client_id: '475894528162-m1t91fok6p6k6g1c3nvno6ou20d14cvb.apps.googleusercontent.com',
      callback: this.handleGoogleLogin
    });
    
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangular',
      locale: 'en'
    });
  }
    
  handleGoogleLogin(response: any) {
    if(response) {
      //decode token
      let token = JSON.parse(atob(response.credential.split('.')[1]));
      //store token in current session
      sessionStorage.setItem('loggedIn', JSON.stringify(token));
      //go to main page with routermodule
      this.router.navigate(['main']);
    }
  }
}
