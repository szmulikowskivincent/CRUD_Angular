import { Injectable } from '@angular/core';
import { IUpdate } from 'src/Models/update';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor() { }

  private update: IUpdate[] = [];

  getUpdate(): IUpdate[] {
    return this.update;
  }

  addUpdate(newUpdate: IUpdate): void {
    this.update.push(newUpdate);
  }

  removeUpdate(id: number): void {
    const index = this.update.findIndex((update) => update.id === id);

    if (index !== -1) {
      this.update.splice(index, 1);
    }
  }
}
