import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToastCategory } from '../model/toast';
import { Todo } from '../model/todo';
import { TodoService } from '../services/todo.service';
import { ToastService } from '../toasts/toast.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() item!: Todo;

  constructor(
    private readonly todoService: TodoService,
    private readonly toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  public markCompleted(newValue: boolean): void {
    this.item.completed = newValue;
    let completedString: string = (this.item.completed) ? 'completed' : 'incomplete';
    this.handleUpdateRequst('MarkCompleted', completedString, this.item, (item) => item.completed = !newValue);
  }

  public markImportant(newValue: boolean): void {
    this.item.important = newValue;
    let importanceString: string = (this.item.important) ? 'important' : 'unimportant';
    this.handleUpdateRequst('MarkImportant', importanceString, this.item, (item) => item.important = !newValue);
  }

  public deleteTodo(): void {
    this.todoService.deleteTodo(this.item)
      .subscribe(() => {
        console.info('Deleting todo item succeeded');
        this.createToast('Deleting todo item succeeded', true);
      }, error => {
        console.error('Deleting todo item failed.', error);
        this.createToast('Deleting todo item failed.', false);
      });
  }

  private handleUpdateRequst(requestName: string, actionString: string, item: Todo, revertAction: (item: Todo) => void): void {
    this.todoService.updateTodo(this.item)
      .subscribe(() => {
        console.info(`Updating todo item (${requestName}) succeeded`);
        this.createToast(`Marking todo ${this.item.title} as ${actionString} succeded`, true);
      }, error => {
        revertAction(item);
        console.error(`Updating todo item (${requestName}) failed.`, error);
        this.createToast(`Marking todo ${this.item.title} as ${actionString} failed`, false);
      });
  }

  private createToast(toastMessage: string, success: boolean) {
    let category: ToastCategory = (success) ? ToastCategory.Success : ToastCategory.Error;
    const toast = new Toast(category, toastMessage);
    this.toastService.addToast(toast);
  }
}
