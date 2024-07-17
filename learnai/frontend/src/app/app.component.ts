import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { TitlebarComponent } from "./titlebar/titlebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, TitlebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
