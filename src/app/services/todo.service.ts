import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TodoItemRepositoryService } from './todo-item-repository.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../model/todo';

@Injectable()
export class TodoService {

  public constructor(
    private readonly http: HttpClient,
    private readonly todoItemRepository: TodoItemRepositoryService
  ) {
  }

  public getAll(): Observable<boolean> {
    return this.http.get<Array<Todo>>(`${environment.restApi}/todos`)
      .pipe(
        map(todos => {
          console.info(`Successfully got all ${todos.length} todos`);
          if (todos.length > 0) {
            this.todoItemRepository.clear();
            for (const todo of todos) {
              this.todoItemRepository.addTodo(todo);
            }
          }
          return true;
        })
      );
  }

  public createTodo(todoItem: Todo): Observable<boolean> {
    const model = {
      title: todoItem.title,
      category: todoItem.category,
      dueDate: todoItem.dueDate,
      important: todoItem.important,
      completed: todoItem.completed
    };
    return this.http.post<Todo>(`${environment.restApi}/todos`, model)
      .pipe(
        map(todo => {
          console.info('Successfully created todo item');
          this.todoItemRepository.addTodo(todo);
          return true;
        })
      );
  }

  public updateTodo(todoItem: Todo): Observable<boolean> {
    return this.http.put(`${environment.restApi}/todos/${todoItem.id}`, todoItem)
    .pipe(
      map(() => {
        console.info('Successfully updated todo item');
        this.todoItemRepository.updateTodo(Number(todoItem.id), todoItem);
        return true;
      })
    );
  }

  public deleteTodo(todoItem: Todo): Observable<boolean> {
    return this.http.delete(`${environment.restApi}/todos/${todoItem.id}`)
      .pipe(
        map(() => {
          console.info('Successfully deleted todo item');
          this.todoItemRepository.removeTodo(todoItem);
          return true;
        })
      );
  }

}
