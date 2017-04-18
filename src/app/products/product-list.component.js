"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var recipe_1 = require("../recipe/recipe");
var recipe_service_1 = require("../recipe/recipe.service");
var ingredient_service_1 = require("../ingredient/ingredient.service");
var app_data_1 = require("../app.data");
var ProductListComponent = (function () {
    function ProductListComponent(_recipeService, _ingredientService, _router, appData) {
        this._recipeService = _recipeService;
        this._ingredientService = _ingredientService;
        this._router = _router;
        this.appData = appData;
        this.pageTitle = 'Recipe List';
    }
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.recipeFullDetails = new recipe_1.RecipeFull();
        this.counter = 0;
        this.recipeFullList = [];
        if (this.appData.recipeIngredients == undefined) {
            this._recipeService.getRecipeIngredients().map(function (ing) { return ing.json(); }).subscribe(function (dataIng) {
                _this.recipeIngredients = dataIng;
                _this.appData.recipeIngredients = _this.recipeIngredients;
            });
        }
        else {
            this.recipeIngredients = this.appData.recipeIngredients;
        }
        if (this.appData.recipe == undefined) {
            this._recipeService.getRecipes().map(function (rec) { return rec.json(); }).subscribe(function (recIng) {
                _this.recipe = recIng;
                _this.appData.recipe = _this.recipe;
            });
        }
        else {
            this.recipe = this.appData.recipe;
        }
        this._ingredientService.getIngredients().subscribe(function (ingredient) {
            _this.ingredient = ingredient;
            _this.initRecipe();
        });
    };
    ProductListComponent.prototype.initRecipe = function () {
        var _this = this;
        this.recipe.forEach(function (element) {
            _this.recipeFull = new recipe_1.RecipeFull();
            _this.recipeFull.ingredients = [];
            _this.counter++;
            _this.recipeFull.id = _this.counter;
            _this.recipeFull.recipeId = element.recipeId;
            _this.recipeFull.recipeName = element.recipeName;
            _this.recipeFull.recipeSource = element.recipeSource;
            if (element.preparationTime.substring(0, 3) == "00:") {
                _this.recipeFull.preparationTime = element.preparationTime.substring(3, 5) + " m";
            }
            else {
                _this.recipeFull.preparationTime = element.preparationTime.substring(0, 2) + " h " + element.preparationTime.substring(3, 5) + " m";
            }
            _this.recipeFull.instructions = element.instructions;
            _this.recipeFull.numberOfIngredients = 0;
            _this.recipeIngredients.forEach(function (element) {
                if (element.recipeId == _this.recipeFull.recipeId) {
                    _this.recipeFull.numberOfIngredients++;
                    var n = _this.ingredient.find(function (p) { return p.id == +element.ingredientId; }).name;
                    var q = element.quantity;
                    _this.recipeFull.ingredients.push({ name: n, quantity: q });
                }
            });
            _this.recipeFullList.push(_this.recipeFull);
        });
        return;
    };
    ProductListComponent.prototype.confirmDeletion = function (deleteItem) {
        this.deleteItem = deleteItem;
        this.deleteRecipeName = deleteItem.recipeName;
    };
    ProductListComponent.prototype.deleteRecipe = function (rec) {
        var selected = this.appData.recipe.find(function (item) { return item.recipeId == rec.recipeId; });
        this.appData.recipe.splice(this.appData.recipe.indexOf(selected), 1);
        this.recipe = this.appData.recipe;
        var selectedIng = this.appData.recipeIngredients.find(function (item) { return item.recipeId == rec.recipeId; });
        this.appData.recipeIngredients.splice(this.appData.recipeIngredients.indexOf(selectedIng), 1);
        this.recipeIngredients = this.appData.recipeIngredients;
        var selectedFullList = this.recipeFullList.find(function (item) { return item.recipeId == rec.recipeId; });
        this.recipeFullList.splice(this.recipeFullList.indexOf(selectedFullList), 1);
    };
    return ProductListComponent;
}());
ProductListComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/products/product-list.component.html',
        styleUrls: ['app/products/product-list.component.css']
    }),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService, ingredient_service_1.IngredientService, router_1.Router, app_data_1.AppData])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map