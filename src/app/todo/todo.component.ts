import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() item!: Todo;

  constructor(
    private readonly todoService: TodoService
  ) { }

  ngOnInit(): void {
  }

  public markCompleted(newValue: boolean): void {
    this.item.completed = newValue;
    this.handleUpdateRequst('MarkCompleted', this.item, (item) => item.completed = !newValue);
  }

  public markImportant(newValue: boolean): void {
    this.item.important = newValue;
    this.handleUpdateRequst('MarkImportant', this.item, (item) => item.important = !newValue);
  }

  public deleteTodo(): void {
    this.todoService.deleteTodo(this.item)
      .subscribe(() => {
        console.info(`Deleting todo item succeeded`);
      }, error => {
        console.error('Deleting todo item failed.', error);
      });
  }


  private handleUpdateRequst(requestName: string, item: Todo, revertAction: (item: Todo) => void): void {
    this.todoService.updateTodo(this.item)
      .subscribe(() => {
        console.info(`Updating todo item (${requestName}) succeeded`);
      }, error => {
        revertAction(item);
        console.error(`Updating todo item (${requestName}) failed.`, error);
      });
  }
}
