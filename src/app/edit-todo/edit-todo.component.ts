import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoItemRepositoryService} from '../services/todo-item-repository.service';
import {Todo} from '../model/todo';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html'
})
export class EditTodoComponent implements OnInit {

  todoItem: Todo;
  editTodoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly todoItemRepository: TodoItemRepositoryService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params.id);
      this.todoItem = this.todoItemRepository.getTodoById(id);
    });

    this.editTodoForm = this.formBuilder.group({
      title: this.todoItem.title,
      category: this.todoItem.category,
      dueDate: this.todoItem.dueDate,
      important: this.todoItem.important
      });
  }

  onSubmit(data: any): void {
    this.editTodoForm.reset();
    console.log(data);

    const todo = new Todo(this.todoItem.id, data.title, data.category, data.dueDate, data.important);
    this.todoItemRepository.updateTodo(this.todoItem.id, todo);
    this.router.navigateByUrl('/');
  }

}
