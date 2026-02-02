import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],//1 add the routerLink to the headercomponent
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
