import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../model/todo';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html'
})
export class AddTodoComponent implements OnInit {

  // @ts-ignore
  addTodoForm: FormGroup;
  isLoading = false;
  onceSubmitted = false;
  addFailed = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly todoService: TodoService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.addTodoForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      dueDate: ['2020-11-26'],
      important: [false],
    });
  }

  addTodo(): void {
    this.onceSubmitted = true;
    this.addFailed = false;

    if (this.addTodoForm.invalid) {
      return;
    }

    this.isLoading = true;

    const title = this.addTodoForm.controls.title.value;
    const category = this.addTodoForm.controls.category.value;
    const dueDate = this.addTodoForm.controls.dueDate.value;
    const important = this.addTodoForm.controls.important.value;

    const todo = new Todo(-1, title, category, dueDate, important);
    this.todoService.createTodo(todo).subscribe(() => {
      console.log('Successfully created todo');
      this.isLoading = false;
      this.router.navigate(['/todos']);
    }, err => {
      console.log('CREATE TODO FAILED:', err);
      this.isLoading = false;
      this.addFailed = true;
    });
  }

}
