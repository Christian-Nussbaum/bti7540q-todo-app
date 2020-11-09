import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';

@Injectable()
export class TodoItemRepositoryService {
  private items:Array<Todo> = [];

  public constructor() { }

  public getTodos(): Array<Todo> {
    return this.items;
  }

  public addTodo(itemToAdd:Todo) {
    this.items.push(itemToAdd);
  }

  public removeTodo(itemToRemove:Todo) {
    this.items = this.items
      .filter(todo => todo.id !== itemToRemove.id);
  }

  public updateTodo(id:number, itemToUpdate:Todo) {
    let item = this.items
      .filter(todo => todo.id === itemToUpdate.id);
    
    for (let item of this.items) {
      if (item.id === id) {
        item = itemToUpdate;
      }
    }
  }

  //TODO Remove when Todos can be retrieved / saved via API
  public generateFakeTodos() {
    for (let i=1; i<=5; i++) {
      const todo = new Todo(i, 'this is a test' + i, 'Test', '2020-11-30', false);
      this.addTodo(todo);
    }
  }
}
