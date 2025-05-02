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

  constructor(private RecipeService: RecipeService) { }

  ngOnInit(): void {
    // Load all recipes on page load
    this.RecipeService.searchRecipesByName('').subscribe((data: any) => {
      this.recipes = data || [];
      this.filteredRecipes = [...this.recipes];
    });
  }

  onSearchInput(): void {
    if (!this.searchQuery.trim()) {
      // If empty, show all again
      this.filteredRecipes = [...this.recipes];
    } else {
      this.RecipeService.searchRecipesByName(this.searchQuery).subscribe((data: any) => {
        this.filteredRecipes = data || [];
      });
    }
  }
  filterByCategory() {
    if (this.selectedCategory) {
      this.recipeService.getRecipesByCategory(this.selectedCategory).subscribe(data => {
        this.recipes = data;
        this.filteredRecipes = this.recipes;
      });
    } else {
      this.getAllRecipes(); // recharger tout si catégorie vide
    }
  }

  categories: string[] = ['Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian'];
selectedCategory: string = '';

}
