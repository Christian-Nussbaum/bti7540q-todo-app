import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';

@Injectable()
export class TodoItemRepositoryService {
  private items: Array<Todo> = [];

  public constructor() { }

  public getTodos(): Array<Todo> {
    return this.items;
  }

  public addTodo(itemToAdd: Todo): void {
    this.items.push(itemToAdd);
  }

  public removeTodo(itemToRemove: Todo): void {
    this.items = this.items
      .filter(todo => todo.id !== itemToRemove.id);
  }

  public updateTodo(id: number, itemToUpdate: Todo): void {
    for (let item of this.items) {
      if (item.id === id) {
        item = itemToUpdate;
      }
    }
  }

  // TODO: Remove when Todos can be retrieved / saved via API
  public generateFakeTodos(): void {
    let important = false;
    for (let i = 1; i <= 5; i++) {
      important = !important;
      const todo = new Todo(i, 'this is a test' + i, 'Test', '2020-11-30', important);
      todo.completed = important;
      this.addTodo(todo);
    }
  }
}
