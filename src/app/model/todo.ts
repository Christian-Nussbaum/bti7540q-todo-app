export class Todo {
  id: number;
  title: string;
  category: string;
  dueDate: string;
  important: boolean;
  completed = false;

  public constructor(id: number, title: string, category: string, dueDate: string, important: boolean) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.dueDate = dueDate;
    this.important = important;
  }
}
