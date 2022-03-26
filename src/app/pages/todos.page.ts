import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import * as TodoSrv from '../todos.service';

@Component({
  template: `
    <div id=lista>
      <ng-container *ngIf="tasks; else elseTemplate">
        <div *ngIf="tasks.length > 0; else elseNoTask">
          <div *ngFor="let task of tasks; let i = index">
            <div>
              - {{ task.title }}
              <button class="complete" (click)="completeTask(task, i)">
                ✅
              </button>
            </div>
          </div>
        </div>
      </ng-container>
      <ng-template #elseTemplate>
        <p>Recupero Tasks...</p>
      </ng-template>
    </div>

    <div class="footer">
      <input type="text" [(ngModel)]="newTaskTitle" />
      <button id='aggiungi' (click)="addTask()">+</button>
    </div>

    <ng-template #elseNoTask>
      <p>Oops, non ci sono Task</p>
    </ng-template>
  `,
  styles: [
    `
    #lista{

      margin-top:60px
    }

      button.complete {
        background: transparent;
        border: none;
        cursor: pointer;
      }
      .footer {
        margin-top: 1rem;
      }
      #aggiungi{
        background-color: black;
        color:white;
        border-radius:40%;
        padding:5px 12px
      }
    `,
  ],
})
export class TodosPage implements OnInit {
  tasks!: Todo[];

  newTaskTitle: string | undefined;
  constructor() {
    TodoSrv.get().then(
      (todos) => (this.tasks = todos.filter((todo) => !todo.completed))
    );
  }

  ngOnInit(): void {}
  async addTask() {
    const nTodo = await TodoSrv.add({
      title: this.newTaskTitle as string,
      completed: false,
    });
    this.tasks.push(nTodo);
    this.newTaskTitle = '';
  }
  async completeTask(todo: Todo, i: number) {
    await TodoSrv.update({ completed: true }, todo.id);
    this.tasks.splice(i, 1);
  }
}
