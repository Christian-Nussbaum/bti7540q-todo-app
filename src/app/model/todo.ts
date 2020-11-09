export class Todo {
  id: number;
  title = '';
  isCompleted = false;

  public constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
