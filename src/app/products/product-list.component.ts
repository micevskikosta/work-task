import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe/recipe';
import { Ingredient } from '../ingredient/ingredient'
import { RecipeFull } from '../recipe/recipe';
import { RecipeIngredient } from '../recipe/recipeIngredient';
import { RecipeService } from '../recipe/recipe.service';
import { IngredientService } from '../ingredient/ingredient.service'
import { AppData } from '../app.data'

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Recipe List';
    deleteItem: RecipeFull;
    deleteRecipeName: string;
    errorMessage: string;
    counter: number;
    recipe: Recipe[];
    recipeFull: RecipeFull;
    recipeFullDetails: RecipeFull;
    recipeFullList: RecipeFull[];
    recipeIngredients: RecipeIngredient[];
    ingredient: Ingredient[];

    constructor(private _recipeService: RecipeService, private _ingredientService: IngredientService, private _router: Router, private appData: AppData) { }
    
    ngOnInit(): void {
        this.recipeFullDetails = new RecipeFull();
        this.counter = 0;
        this.recipeFullList = [];

        if (this.appData.recipeIngredients == undefined) {
            this._recipeService.getRecipeIngredients().map(
                ing => ing.json()).subscribe(dataIng => {
                    this.recipeIngredients = dataIng;
                    this.appData.recipeIngredients = this.recipeIngredients;
                });
        }
        else {
            this.recipeIngredients = this.appData.recipeIngredients;
        }

        if (this.appData.recipe == undefined) {
            this._recipeService.getRecipes().map(
                rec => rec.json()).subscribe(recIng => {
                    this.recipe = recIng;
                    this.appData.recipe = this.recipe;
                });
        }
        else {
            this.recipe = this.appData.recipe;
        }

        this._ingredientService.getIngredients().subscribe(
            ingredient => {
                this.ingredient = ingredient;
                this.initRecipe();
        });
    }

    initRecipe(): PromiseLike<void> {
        this.recipe.forEach(element => {
            this.recipeFull = new RecipeFull();
            this.recipeFull.ingredients = [];
            this.counter++;
            this.recipeFull.id = this.counter;
            this.recipeFull.recipeId = element.recipeId;
            this.recipeFull.recipeName = element.recipeName;
            this.recipeFull.recipeSource = element.recipeSource;

            if (element.preparationTime.substring(0, 3) == "00:") {
                this.recipeFull.preparationTime = element.preparationTime.substring(3, 5) + " m";
            }
            else {
                this.recipeFull.preparationTime = element.preparationTime.substring(0, 2) + " h " + element.preparationTime.substring(3, 5) + " m";
            }

            this.recipeFull.instructions = element.instructions;
            this.recipeFull.numberOfIngredients = 0;

            this.recipeIngredients.forEach(element => {
                if (element.recipeId == this.recipeFull.recipeId) {
                    this.recipeFull.numberOfIngredients++;
                    let n: string = this.ingredient.find(p => p.id == +element.ingredientId).name;
                    let q: number = element.quantity;
                    this.recipeFull.ingredients.push({ name: n, quantity: q });
                }
            });
            this.recipeFullList.push(this.recipeFull);
        });
        return;
    }

    confirmDeletion(deleteItem: RecipeFull): void {
        this.deleteItem = deleteItem;
        this.deleteRecipeName = deleteItem.recipeName;
    }

    deleteRecipe(rec: Recipe): void {
        let selected = this.appData.recipe.find(item => item.recipeId == rec.recipeId);
        this.appData.recipe.splice(this.appData.recipe.indexOf(selected), 1);
        this.recipe = this.appData.recipe;

        let selectedIng = this.appData.recipeIngredients.find(item => item.recipeId == rec.recipeId);
        this.appData.recipeIngredients.splice(this.appData.recipeIngredients.indexOf(selectedIng), 1);

        this.recipeIngredients = this.appData.recipeIngredients;

        let selectedFullList = this.recipeFullList.find(item => item.recipeId == rec.recipeId);
        this.recipeFullList.splice(this.recipeFullList.indexOf(selectedFullList), 1);
    }
}
