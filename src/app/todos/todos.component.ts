import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoItemRepositoryService } from '../services/todo-item-repository.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  public constructor(
    private readonly todoItemRepository:TodoItemRepositoryService
  ) { 
    
  }

  public get items(): Array<Todo> {
    return this.todoItemRepository.getTodos();
  }

  ngOnInit(): void {
  }

}
