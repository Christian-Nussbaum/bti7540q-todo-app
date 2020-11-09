import { Component } from '@angular/core';
import { Todo } from './model/todo';
import { TodoItemRepositoryService } from './services/todo-item-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo-App';

  public constructor(
    private readonly todoItemRepository:TodoItemRepositoryService
  ) { 
    this.todoItemRepository.generateFakeTodos();
  }

  public get items(): Array<Todo> {
    return this.todoItemRepository.getTodos();
  }

}
