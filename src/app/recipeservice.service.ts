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

  getRecipesByCategory(category: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/filter.php?c=${category}`).pipe(
      map(response => response.meals || [])
    );
  }

  searchRecipesByName(name: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/search.php?s=${name}`).pipe(
      map(response => response.meals || [])
    );
  }

 getTrendingRecipes():Observable<any[]>{

  const categories = ['Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return this.getRecipesByCategory(randomCategory).pipe(
    map(recipes => recipes.slice(0,6))
  );
 }



  getRecipeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lookup.php?i=${id}`).pipe(
      map(response => response.meals ? response.meals[0] : null)
    );
  }

  getAllRecipes(): Observable<any[]> {

    const categories = ['Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian'];
    const allRequests = categories.map(category =>
      this.getRecipesByCategory(category)
    );
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
