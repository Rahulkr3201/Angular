import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { UserService } from './services/user.services';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('tutorials');

  private userService = inject(UserService);

  ngOnInit() {
    // SIMPLE API CALL
    this.userService.getUsers().subscribe(users => {
      console.log('App.ts users:', users);
    });
  }

  handleClick() {
    console.log('clicked');
    this.otherFunction();
  }

  otherFunction() {
    console.log('otherFunction called');
  }
}
