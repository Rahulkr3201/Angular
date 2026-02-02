import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Home } from './home/home';


@Component({
  selector: 'app-root',
  imports: [Header,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tutorials');

  handleClick(){
    console.log("clicked ");
    this.otherFunction();// we have to use this because this is a class based .
  }
  otherFunction(){
    console.log("otherFunction called")
  }
}
   