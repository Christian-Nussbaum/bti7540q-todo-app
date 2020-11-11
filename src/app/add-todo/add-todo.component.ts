import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  addTodoForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.addTodoForm = this.formBuilder.group({
    title: '',
    category: '',
    dueDate: '',
    important: false
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.addTodoForm.reset();
    console.warn('added todo');
  }

}
