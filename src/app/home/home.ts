import { Component, signal } from '@angular/core';
import { Greetings } from '../components/greetings/greetings';

@Component({
  selector: 'app-home',
  imports: [Greetings],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  homeMessage = signal("20")

}
