import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from './recipe';
import { RecipeIngredient } from './recipeIngredient';
import { RecipeService } from './recipe.service';
import { Ingredient } from '../ingredient/ingredient'
import { IngredientService } from '../ingredient/ingredient.service'
import { AppData } from '../app.data'

declare var $: any;

@Component({
    templateUrl: 'app/recipe/recipe.component.html',
    styleUrls: ['app/recipe/recipe.component.css']
})
export class RecipeComponent implements OnInit {
    recipe: Recipe;
    ingredient: Ingredient[];
    recipeIngredient: RecipeIngredient[];
    constructor(private _recipeService: RecipeService, private _ingredientService: IngredientService, private _router: Router, private appData: AppData) {
        setTimeout(() => {
            $('#preparationTime').datetimepicker({ format: 'HH:mm' });
        }, 0);
    }

    ngOnInit(): void {
        this.recipe = new Recipe();
        this._ingredientService.getIngredients().subscribe(
            ingredient => this.ingredient = ingredient);
    }

    saveRecipe() {
        if (this.appData.recipe == undefined) {
            this._recipeService.getRecipes().map(
                rec => rec.json()).subscribe(recIng => {
                    this.appData.recipe = recIng;
                    this.recipe.recipeId = this.appData.recipe.length + 1
                });
        }
        else {
            this.recipe.recipeId = this.appData.recipe.length + 1
        }

        this.recipeIngredient = [];
        this.recipe.preparationTime = $("#preparation").find("input").val();
        this.ingredient.forEach(element => {
            if (element.quantity > 0) {
                let i = this.newGuid();
                let r = this.recipe.recipeId;
                let ing = element.id;
                let q = element.quantity;
                this.recipeIngredient.push({ id: i, recipeId: r, ingredientId: ing, quantity: q });
                if (this.appData.recipeIngredients == undefined) {
                    this._recipeService.getRecipeIngredients().map(
                        ing => ing.json()).subscribe(dataIng => {
                            this.appData.recipeIngredients = dataIng;
                            this.appData.recipeIngredients.push({ id: i, recipeId: r, ingredientId: ing, quantity: q })
                        });
                }
                else {
                    this.appData.recipeIngredients.push({ id: i, recipeId: r, ingredientId: ing, quantity: q })
                }
            }
        });
        
        setTimeout(() => {
            this.appData.recipe.push(this.recipe);
            this._router.navigate(['recipeList']);
        }, 500)
    }

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}