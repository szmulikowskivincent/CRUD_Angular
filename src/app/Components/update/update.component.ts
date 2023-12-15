import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  urlValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // Expression régulière pour vérifier le format de l'URL
    const urlPattern =
      /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/)?(\S)*$/;

    if (control.value && !urlPattern.test(control.value)) {
      return { invalidUrl: true };
    }

    return null; // L'URL est valide
  }

  initializeForm(): void {
    this.updateForm = this.fb.group({
      date: ['', [Validators.required]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
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
      alert('Vous allez ajouter des ressources à la liste!');
    } else {
      alert("⚠️Le formulaire n'est pas valide. Veuillez vérifier vos entrées.");
    }
  }

  saveImageToLocal(imageFile: File): string {
    // Logique pour sauvegarder l'image dans le local storage
    const imageUrl = 'url_de_l_image'; 
    return imageUrl;
  }

  removeUpdate(id: number): void {
    this.updateService.removeUpdate(id);
    this.updates = this.updateService.getUpdate();
    this.saveUpdatesToLocalStorage(); // Sauvegarder dans le local storage
  }

  addToMyList(): void {
    const newItem = {
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
}
