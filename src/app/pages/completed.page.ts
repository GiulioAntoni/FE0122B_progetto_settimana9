import { TodosPage } from './todos.page';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import * as TodoSrv from '../todos.service';

@Component({
  template: `
    <div id='finito'>
      <ng-container *ngIf="tasks; else elseTemplate">
        <div *ngIf="tasks.length > 0; else elseNoTask">
          <div *ngFor="let task of tasks; let i = index">
            <div>- {{ task.title }}</div>
          </div>
        </div>
      </ng-container>
      <ng-template #elseTemplate>
        <p>Recupero Task...</p>
      </ng-template>
    </div>

    <ng-template #elseNoTask> <p>Non ci sono task completati</p> </ng-template>
  `,
  styles: [
    `
      #finito {
        margin-top: 60px;
      }
    `
  ],
})
export class CompletedPage {
  tasks!: Todo[];

  newTaskTitle: string | undefined;
  constructor() {
    TodoSrv.get().then(
      (todos) => (this.tasks = todos.filter((todo) => todo.completed))
    );
  }
}
