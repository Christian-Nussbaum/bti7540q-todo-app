import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoItemRepositoryService } from '../services/todo-item-repository.service';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {

  public constructor(
    private readonly todoItemRepository: TodoItemRepositoryService,
    private readonly todoService: TodoService
  ) {
  }

  public get items(): Array<Todo> {
    return this.todoItemRepository.getTodos();
  }

  ngOnInit(): void {
    this.todoService.getAll().subscribe(() => {
      console.info('Getting all todos succeded');
    }, error => {
      console.error('Getting all todos failed', error);

    });
  }

}
