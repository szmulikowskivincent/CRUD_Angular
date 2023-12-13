import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './Components/update/update.component';


const routes: Routes = [
{path: 'Update', component: UpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

