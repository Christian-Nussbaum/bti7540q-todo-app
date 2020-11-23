import { Component } from '@angular/core';
import { TodoItemRepositoryService } from './services/todo-item-repository.service';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public constructor(
    private readonly todoItemRepository: TodoItemRepositoryService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,

  ) {
    this.todoItemRepository.generateFakeTodos();
  }

  public get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
