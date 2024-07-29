declare var google: any;

import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { environmentProd } from '../../environment/environment.prod';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  google_thing = google;
  endpoint = environment.production ? environmentProd.apiEndpoint : environment.apiEndpoint;
  
  private router = inject(Router);
  

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    if(sessionStorage.getItem('loggedIn')) {
      this.router.navigate(['/main']);
    }

    google.accounts.id.initialize({
      client_id: '475894528162-m1t91fok6p6k6g1c3nvno6ou20d14cvb.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleLogin(response)
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
      this.httpClient.post<any>(this.endpoint + '/api/account/login', {token: token})
      .subscribe(() => {
        //store token in current session
        sessionStorage.setItem('loggedIn', JSON.stringify(token));
        //go to main page with routermodule
        this.router.navigate(['/main']);
      });
    }
  }
}
