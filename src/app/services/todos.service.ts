import { Injectable } from '@angular/core';
import {Todo} from '../model/todo.type'
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class todoservice {
  todoitems: Array<Todo>=[{
    title:'grpceries',
    completed:false,
    id:1,
    userId:1
  },
  {
    title:'food',
    completed:false,
    id:2,
    userId:2

  }
]  
}
