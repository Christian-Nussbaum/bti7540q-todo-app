import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../model/todo';
import { TodoItemRepositoryService } from '../services/todo-item-repository.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html'
})
export class AddTodoComponent implements OnInit {
  addTodoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly todoItemRepository: TodoItemRepositoryService,
    private router: Router
  ) {
    this.addTodoForm = this.formBuilder.group({
      title: '',
      category: '',
      dueDate: '',
      important: false
    });
  }

  ngOnInit(): void {
  }

  onSubmit(data: any): void {
    this.addTodoForm.reset();
    console.log(data);

    const todo = new Todo(5, data.title, data.category, data.dueDate, data.important);
    this.todoItemRepository.addTodo(todo);
    this.router.navigateByUrl('/');
  }

}
