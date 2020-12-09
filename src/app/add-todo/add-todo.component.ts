import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastCategory } from '../model/toast';
import { Todo } from '../model/todo';
import { TodoService } from '../services/todo.service';
import { ToastService } from '../toasts/toast.service';
import { DateService } from '../utils/date/date.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html'
})
export class AddTodoComponent implements OnInit {

  // @ts-ignore
  addTodoForm: FormGroup;
  isLoading = false;
  onceSubmitted = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly todoService: TodoService,
    private readonly router: Router,
    private readonly dateService: DateService,
    private readonly toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.addTodoForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      dueDate: [this.getDate()],
      important: [false],
    });
  }

  getDate(): string {
   return this.dateService.getCurrentDateString();
  }

  addTodo(): void {
    this.onceSubmitted = true;

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
      let msg: string = 'Successfully created todo';
      console.log(msg);
      this.isLoading = false;
      this.router.navigate(['/todos']);
      const toast = new Toast(ToastCategory.Success, msg);
      this.toastService.addToast(toast);
    }, err => {
      let msg: string = 'CREATE TODO FAILED:';
      console.log(msg, err);
      this.isLoading = false;
      const toast = new Toast(ToastCategory.Error, msg);
      this.toastService.addToast(toast);
    });
  }

}
