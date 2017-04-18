import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../ingredient/ingredient'
import { Ingredients } from '../recipe/recipe'
import { Recipe } from '../recipe/recipe';
import { RecipeIngredient } from '../recipe/recipeIngredient';
import { RecipeService } from '../recipe/recipe.service';
import { IngredientService } from '../ingredient/ingredient.service'
import { AppData } from '../app.data'

@Component({
    templateUrl: 'app/products/product-detail.component.html',
    styleUrls: ['app/products/product-list.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    pageTitle: string = 'Recipe Detail';
    errorMessage: string;
    recipe: Recipe;
    deleteItem: Recipe;
    deleteRecipeName: string;
    recipeIngredients: Ingredients[] = [];
    allRecipeIngredients: RecipeIngredient[];
    ingredient: Ingredient[];

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _recipeService: RecipeService, private _ingredientService: IngredientService, private appData: AppData) { }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                if (this.appData.recipe == undefined) {
                    this._recipeService.getRecipes().map(
                        rec => rec.json()).subscribe(recIng => {
                            this.appData.recipe = recIng;
                            this.recipe = this.appData.recipe.find(item => item.recipeId == id);
                        });
                }
                else {
                    this.recipe = this.appData.recipe.find(item => item.recipeId == id);
                }

                if (this.appData.recipeIngredients == undefined) {
                    this._recipeService.getRecipeIngredients().map(
                        ing => ing.json()).subscribe(dataIng => {
                            this.appData.recipeIngredients = dataIng;
                            this.allRecipeIngredients = this.appData.recipeIngredients;
                        });
                }
                else {
                    this.allRecipeIngredients = this.appData.recipeIngredients;
                }

                this._ingredientService.getIngredients().subscribe(
                    ingredient => {
                        this.ingredient = ingredient;
                        this.initDetails();
                    });
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    initDetails(): PromiseLike<void> {
        if (this.recipe.preparationTime.substring(0, 3) == "00:") {
            this.recipe.preparationTime = this.recipe.preparationTime.substring(3, 5) + " m";
        }
        else {
            this.recipe.preparationTime = this.recipe.preparationTime.substring(0, 2) + " h " + this.recipe.preparationTime.substring(3, 5) + " m";
        }

        this.allRecipeIngredients.forEach(element => {
            if (element.recipeId == this.recipe.recipeId) {
                let n: string = this.ingredient.find(p => p.id == +element.ingredientId).name;
                let q: number = element.quantity;
                this.recipeIngredients.push({ name: n, quantity: q });
            }
        })
        return;
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }

    confirmDeletion(deleteItem: Recipe): void {
        this.deleteItem = deleteItem;
        this.deleteRecipeName = deleteItem.recipeName;
    }

    deleteRecipe(rec: Recipe): void {
        let selected = this.appData.recipe.find(item => item.recipeId == rec.recipeId);
        this.appData.recipe.splice(this.appData.recipe.indexOf(selected), 1);
        this._router.navigate(['/products']);
    }
}