import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Recipe } from './Recipe';
import { RecipeIngredient } from './recipeIngredient';

@Injectable()
export class RecipeService {
    private _recipeUrl = 'api/recipe/recipe.json';
    private _recipeIngredientUrl = 'api/recepieIngrediens/recipeIngredients.json';
    recipe: Recipe[];
    constructor(private _http: Http) { }

    save(value: Recipe) {
        let jsonString = JSON.stringify(value);
    }

    saveRecipeIngredient(value: RecipeIngredient[]){
         let jsonString = JSON.stringify(value);
    }

    getRecepies() {
        return this._http.get(this._recipeUrl);
    }


    getIngredientsWithParam(value: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('recipeId', value);
        return this._http.get(this._recipeIngredientUrl, params);
    }


    getRecipeIngredients() {
        return this._http.get(this._recipeIngredientUrl);
    }


    getOneRecepies(id: number): Observable<Recipe> {
        return this.getRecepiesObservable()
            .map((recipies: Recipe[]) => recipies.find(p => p.recipeId == id));
    }


    getRecepiesObservable(): Observable<Recipe[]> {
        return this._http.get(this._recipeUrl)
            .map((response: Response) => <Recipe[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
    }


    delete(id: number) {
        // return this._http.delete(this._recipeIngredientUrl + id);
    }
}
