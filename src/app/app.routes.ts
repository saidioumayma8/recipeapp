import { Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-detail/recipe-detail.component';
import { HomeComponent } from '../app/home/home.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
];


