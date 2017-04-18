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
var recipe_service_1 = require("../recipe/recipe.service");
var ingredient_service_1 = require("../ingredient/ingredient.service");
var app_data_1 = require("../app.data");
var ProductDetailComponent = (function () {
    function ProductDetailComponent(_route, _router, _recipeService, _ingredientService, appData) {
        this._route = _route;
        this._router = _router;
        this._recipeService = _recipeService;
        this._ingredientService = _ingredientService;
        this.appData = appData;
        this.pageTitle = 'Recipe Detail';
        this.recipeIngredients = [];
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._route.params.subscribe(function (params) {
            var id = +params['id'];
            if (_this.appData.recipe == undefined) {
                _this._recipeService.getRecipes().map(function (rec) { return rec.json(); }).subscribe(function (recIng) {
                    _this.appData.recipe = recIng;
                    _this.recipe = _this.appData.recipe.find(function (item) { return item.recipeId == id; });
                });
            }
            else {
                _this.recipe = _this.appData.recipe.find(function (item) { return item.recipeId == id; });
            }
            if (_this.appData.recipeIngredients == undefined) {
                _this._recipeService.getRecipeIngredients().map(function (ing) { return ing.json(); }).subscribe(function (dataIng) {
                    _this.appData.recipeIngredients = dataIng;
                    _this.allRecipeIngredients = _this.appData.recipeIngredients;
                });
            }
            else {
                _this.allRecipeIngredients = _this.appData.recipeIngredients;
            }
            _this._ingredientService.getIngredients().subscribe(function (ingredient) {
                _this.ingredient = ingredient;
                _this.initDetails();
            });
        });
    };
    ProductDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductDetailComponent.prototype.initDetails = function () {
        var _this = this;
        if (this.recipe.preparationTime.substring(0, 3) == "00:") {
            this.recipe.preparationTime = this.recipe.preparationTime.substring(3, 5) + " m";
        }
        else {
            this.recipe.preparationTime = this.recipe.preparationTime.substring(0, 2) + " h " + this.recipe.preparationTime.substring(3, 5) + " m";
        }
        this.allRecipeIngredients.forEach(function (element) {
            if (element.recipeId == _this.recipe.recipeId) {
                var n = _this.ingredient.find(function (p) { return p.id == +element.ingredientId; }).name;
                var q = element.quantity;
                _this.recipeIngredients.push({ name: n, quantity: q });
            }
        });
        return;
    };
    ProductDetailComponent.prototype.onBack = function () {
        this._router.navigate(['/products']);
    };
    ProductDetailComponent.prototype.confirmDeletion = function (deleteItem) {
        this.deleteItem = deleteItem;
        this.deleteRecipeName = deleteItem.recipeName;
    };
    ProductDetailComponent.prototype.deleteRecipe = function (rec) {
        var selected = this.appData.recipe.find(function (item) { return item.recipeId == rec.recipeId; });
        this.appData.recipe.splice(this.appData.recipe.indexOf(selected), 1);
        this._router.navigate(['/products']);
    };
    return ProductDetailComponent;
}());
ProductDetailComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/products/product-detail.component.html',
        styleUrls: ['app/products/product-list.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        recipe_service_1.RecipeService, ingredient_service_1.IngredientService, app_data_1.AppData])
], ProductDetailComponent);
exports.ProductDetailComponent = ProductDetailComponent;
//# sourceMappingURL=product-detail.component.js.map