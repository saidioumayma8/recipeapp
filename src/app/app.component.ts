import { Component } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';
import { RecipeDetailsComponent } from './recipe-detail/recipe-detail.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: '', component: HomeComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Your Application';
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, RouterModule.forRoot(routes))
  ]
}).catch(err => console.error(err));
