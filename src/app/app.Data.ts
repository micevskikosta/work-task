import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Recipe } from '../app/recipe/recipe';
import { RecipeService } from '../app/recipe/recipe.service';
import { RecipeIngredient } from '../app/recipe/recipeIngredient';

@Injectable()
export class AppData {
    public recipe: Array<Recipe>;
    recipeIngredients: RecipeIngredient[];

    constructor(private http: Http, private _router: Router, private _recipeService: RecipeService) {}
}




