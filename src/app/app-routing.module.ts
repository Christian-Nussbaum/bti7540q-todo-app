import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-todo', component: AddTodoComponent },
  { path: 'edit-todo/:id', component: EditTodoComponent },
  { path: '**', component: TodosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
