import { TestBed } from '@angular/core/testing';

import { TodoItemRepositoryService } from './todo-item-repository.service';

describe('TodoItemRepositoryService', () => {
  let service: TodoItemRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoItemRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
