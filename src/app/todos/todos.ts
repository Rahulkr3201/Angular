import { Component } from '@angular/core';
import { Inject ,OnInit} from '@angular/core';
import { todoservice } from '../services/todos.service'; 

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos implements OnInit {
  todoservice=Inject(todoservice);

  ngOnInit():void{
    console.log(this.todoservice.todoitems);
  }

}
