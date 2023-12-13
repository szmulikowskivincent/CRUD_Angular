import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Shopping List';
 
  shoppingList: string[] = [];
fans: any;

  onAddArticle(article: string) {
    this.shoppingList.push(article);
  }

  onRemoveArticle(index: number) {
    this.shoppingList.splice(index, 1);
  }

  fansList: any[] = [];

  addFan(newFan: any) {
    // Ajouter ou mettre à jour le fan dans la liste
    const existingFanIndex = this.fansList.findIndex(fan => fan.nom === newFan.nom && fan.prenom === newFan.prenom);
    if (existingFanIndex !== -1) {
      this.fansList[existingFanIndex] = newFan;
    } else {
      this.fansList.push(newFan);
    }
  }

  removeFan(index: number) {
    // Supprimer le fan de la liste
    this.fansList.splice(index, 1);
  }
}

  

