import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateService } from 'src/Services/update.service';

interface IUpdate {
  id: number;
  description: string;
  url: string;
  date: Date;
  image: string | null; 
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  updateForm!: FormGroup;
  updates: IUpdate[] = [];
  myList: any[] = [];

  constructor(private fb: FormBuilder, private updateService: UpdateService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUpdatesFromLocalStorage();
  }

  initializeForm(): void {
    this.updateForm = this.fb.group({
      date: ['', [Validators.required]],
      description: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
      ],
      url: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  addUpdate(): void {
    // Vérifier si le formulaire est valide
    if (this.updateForm.valid) {
      const newUpdate: IUpdate = {
        id: this.updates.length + 1,
        ...this.updateForm.value,
      };

      console.log('Ressources mises à jour ! :', newUpdate);

      this.updateService.addUpdate(newUpdate);
      this.updates = this.updateService.getUpdate();
      this.saveUpdatesToLocalStorage(); // Sauvegarder dans le local storage
      this.updateForm.reset();
      alert("Vous allez ajouter des ressources à la liste!");
    } else {
      // Le formulaire n'est pas valide, gérer l'erreur ou fournir une rétroaction à l'utilisateur
      alert("Le formulaire n'est pas valide. Veuillez vérifier vos entrées.");
    }
  }

  saveImageToLocal(imageFile: File): string {
    // Logique pour sauvegarder l'image dans le local storage
    const imageUrl = 'url_de_l_image'; // Remplacez cela par la vraie URL ou la logique de sauvegarde
    return imageUrl;
  }

  removeUpdate(id: number): void {
    this.updateService.removeUpdate(id);
    this.updates = this.updateService.getUpdate();
    this.saveUpdatesToLocalStorage(); // Sauvegarder dans le local storage
  }

  addToMyList(): void {
    const newItem = {
      /* détails de l'élément à ajouter */
    };
    this.myList.push(newItem);
  }

  reloadPage(): void {
    location.reload();
  }

  private saveUpdatesToLocalStorage(): void {
    localStorage.setItem('updates', JSON.stringify(this.updates));
  }

  private loadUpdatesFromLocalStorage(): void {
    const storedUpdates = localStorage.getItem('updates');
    if (storedUpdates) {
      this.updates = JSON.parse(storedUpdates);
    }
  }

  downloadDataAsJson(): void {
    const jsonData = JSON.stringify(this.updates);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'updates.json';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}



