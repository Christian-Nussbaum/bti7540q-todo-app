import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from '../model/todo';
import {TodoService} from '../services/todo.service';
import {TodoItemRepositoryService} from '../services/todo-item-repository.service'
import {DateService} from '../utils/date/date.service';
import { Toast, ToastCategory } from '../model/toast';
import { ToastService } from '../toasts/toast.service';


@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html'
})
export class EditTodoComponent implements OnInit {

  // @ts-ignore
  todoItem: Todo;
  // @ts-ignore
  editTodoForm: FormGroup;
  isLoading = false;
  onceSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly todoService: TodoService,
    private readonly todoItemRepositoryService: TodoItemRepositoryService,
    private readonly dateService: DateService,
    private readonly toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params.id);
      this.todoItem = this.todoItemRepositoryService.getTodoById(id);
    });

    this.editTodoForm = this.formBuilder.group({
      title: [this.todoItem.title, Validators.required],
      category: [this.todoItem.category, Validators.required],
      dueDate: [this.todoItem.dueDate, Validators.required],
      important: [this.todoItem.important]
      });
  }

  getDate(): string {
    return this.dateService.getCurrentDateString();
  }

  editTodo(): void {
    this.onceSubmitted = true;

    if (this.editTodoForm.invalid) {
      return;
    }

    this.isLoading = true;

    const title = this.editTodoForm.controls.title.value;
    const category = this.editTodoForm.controls.category.value;
    const dueDate = this.editTodoForm.controls.dueDate.value;
    const important = this.editTodoForm.controls.important.value;

    const todo = new Todo(this.todoItem.id, title, category, dueDate, important);
    this.todoService.updateTodo(todo).subscribe(() => {
      let msg: string = 'Successfully updated todo';
      console.log(msg);
      this.isLoading = false;
      this.router.navigate(['/todos']);
      const toast = new Toast(ToastCategory.Success, msg);
      this.toastService.addToast(toast);
    }, err => {
      let msg: string = 'UPDATE TODO FAILED:';
      console.log(msg, err);
      this.isLoading = false;
      const toast = new Toast(ToastCategory.Error, msg);
      this.toastService.addToast(toast);
    });
  }
}
