import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodoItemRepositoryService} from '../services/todo-item-repository.service';
import {Todo} from '../model/todo';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  todoItem: Todo;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly todoItemRepository: TodoItemRepositoryService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params.id);
      this.todoItem = this.todoItemRepository.getTodoById(id);
    });
  }

}
