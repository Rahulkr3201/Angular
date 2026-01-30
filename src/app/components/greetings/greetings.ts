import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-greetings',
  imports: [],
  templateUrl: './greetings.html',
  styleUrl: './greetings.css',
})
export class Greetings {
  message =input<string>();
  //use input if you want to get anything fro the parent. parent sends it using the signal

}
