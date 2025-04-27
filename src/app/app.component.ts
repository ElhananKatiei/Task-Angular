import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from "./components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  title = 'Front-Task home page';
}
