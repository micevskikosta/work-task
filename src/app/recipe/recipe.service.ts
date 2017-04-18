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
    
    /** Returns all the recipes */
    getRecipes() {
        return this._http.get(this._recipeUrl);
    }

    /** Returns all the recepie ingredients */
    getRecipeIngredients() {
        return this._http.get(this._recipeIngredientUrl);
    }
}
