import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Todo} from '../model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() item!: Todo;

  constructor() { }

  ngOnInit(): void {
  }

  public markCompleted(newValue: boolean): void {
    this.item.completed = newValue;
    // TODO: Send request to server
  }

  public markImportant(newValue: boolean): void {
    this.item.important = newValue;
    // TODO: Send request to server
  }
}
