import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../app/recipeservice.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  searchQuery: string = '';
  categories: string[] = ['Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian'];
  selectedCategory: string = '';

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getAllRecipes(); // méthode bien définie maintenant
  }

  getAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((data: any) => {
      this.recipes = data || [];
      this.filteredRecipes = [...this.recipes];
    });
  }

  onSearchInput(): void {
    if (!this.searchQuery.trim()) {
      this.filteredRecipes = [...this.recipes];
    } else {
      this.recipeService.searchRecipesByName(this.searchQuery).subscribe((data: any) => {
        this.filteredRecipes = data || [];
      });
    }
  }

  filterByCategory(): void {
    if (this.selectedCategory) {
      this.recipeService.getRecipesByCategory(this.selectedCategory).subscribe((data: any) => {
        this.recipes = data || [];
        this.filteredRecipes = [...this.recipes];
      });
    } else {
      this.getAllRecipes(); // si aucune catégorie choisie
    }
  }
}
