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

  public getTodoById(id: number): Todo {
     // @ts-ignore
    return this.items
      .find(todo => todo.id === id);
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

}
