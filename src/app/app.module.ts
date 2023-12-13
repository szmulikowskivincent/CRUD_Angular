import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { UpdateComponent } from './Components/update/update.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DisplayComponent } from './Components/affichage/display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UpdateComponent,
    FooterComponent,
    DisplayComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

