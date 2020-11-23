import { Component } from '@angular/core';
import { TodoItemRepositoryService } from './services/todo-item-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public constructor(
    private readonly todoItemRepository: TodoItemRepositoryService
  ) {
    this.todoItemRepository.generateFakeTodos();
  }
}
