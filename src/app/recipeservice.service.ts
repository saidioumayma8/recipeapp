import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) { }

  // 1. Get recipes by category
  getRecipesByCategory(category: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/filter.php?c=${category}`).pipe(
      map(response => response.meals || [])
    );
  }

  // 2. Get recipe by ID
  getRecipeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lookup.php?i=${id}`).pipe(
      map(response => response.meals ? response.meals[0] : null)
    );
  }

  // 3. Search recipes by name
  searchRecipesByName(name: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/search.php?s=${name}`).pipe(
      map(response => response.meals || [])
    );
  }

  // 4. Get recipes by ingredient
  getRecipesByIngredient(ingredient: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/filter.php?i=${ingredient}`).pipe(
      map(response => response.meals || [])
    );
  }

  // 5. Get all categories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/categories.php`).pipe(
      map(response => response.categories || [])
    );
  }

  // 6. Get random recipe
  getRandomRecipe(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/random.php`).pipe(
      map(response => response.meals ? response.meals[0] : null)
    );
  }

  // 7. Get recipes by area (e.g. Moroccan, Canadian...)
  getRecipesByArea(area: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/filter.php?a=${area}`).pipe(
      map(response => response.meals || [])
    );
  }

  // 8. Get all areas
  getAllAreas(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/list.php?a=list`).pipe(
      map(response => response.meals.map((m: any) => m.strArea))
    );
  }

  // 9. Get trending/random recipes
  getTrendingRecipes(): Observable<any[]> {
    const categories = ['Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return this.getRecipesByCategory(randomCategory).pipe(
      map(recipes => recipes.slice(0, 6))
    );
  }

  // 10. Get all recipes (by combining categories)
  getAllRecipes(): Observable<any[]> {
    const categories = ['Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian'];
    const allRequests = categories.map(category => this.getRecipesByCategory(category));

    return new Observable(observer => {
      let allMeals: any[] = [];
      let completed = 0;

      allRequests.forEach(request => {
        request.subscribe(meals => {
          allMeals = [...allMeals, ...meals];
          completed++;

          if (completed === allRequests.length) {
            observer.next(allMeals);
            observer.complete();
          }
        });
      });
    });
  }
}
