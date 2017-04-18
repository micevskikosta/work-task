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
var recipe_1 = require("./recipe");
var recipe_service_1 = require("./recipe.service");
var ingredient_service_1 = require("../ingredient/ingredient.service");
var app_data_1 = require("../app.data");
var RecipeComponent = (function () {
    function RecipeComponent(_recipeService, _ingredientService, _router, appData) {
        this._recipeService = _recipeService;
        this._ingredientService = _ingredientService;
        this._router = _router;
        this.appData = appData;
        setTimeout(function () {
            $('#preparationTime').datetimepicker({ format: 'HH:mm' });
        }, 0);
    }
    RecipeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.recipe = new recipe_1.Recipe();
        this._ingredientService.getIngredients().subscribe(function (ingredient) { return _this.ingredient = ingredient; });
    };
    RecipeComponent.prototype.saveRecipe = function () {
        var _this = this;
        if (this.appData.recipe == undefined) {
            this._recipeService.getRecipes().map(function (rec) { return rec.json(); }).subscribe(function (recIng) {
                _this.appData.recipe = recIng;
                _this.recipe.recipeId = _this.appData.recipe.length + 1;
            });
        }
        else {
            this.recipe.recipeId = this.appData.recipe.length + 1;
        }
        this.recipeIngredient = [];
        this.recipe.preparationTime = $("#preparation").find("input").val();
        this.ingredient.forEach(function (element) {
            if (element.quantity > 0) {
                var i_1 = _this.newGuid();
                var r_1 = _this.recipe.recipeId;
                var ing_1 = element.id;
                var q_1 = element.quantity;
                _this.recipeIngredient.push({ id: i_1, recipeId: r_1, ingredientId: ing_1, quantity: q_1 });
                if (_this.appData.recipeIngredients == undefined) {
                    _this._recipeService.getRecipeIngredients().map(function (ing) { return ing.json(); }).subscribe(function (dataIng) {
                        _this.appData.recipeIngredients = dataIng;
                        _this.appData.recipeIngredients.push({ id: i_1, recipeId: r_1, ingredientId: ing_1, quantity: q_1 });
                    });
                }
                else {
                    _this.appData.recipeIngredients.push({ id: i_1, recipeId: r_1, ingredientId: ing_1, quantity: q_1 });
                }
            }
        });
        setTimeout(function () {
            _this.appData.recipe.push(_this.recipe);
            _this._router.navigate(['recipeList']);
        }, 500);
    };
    RecipeComponent.prototype.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return RecipeComponent;
}());
RecipeComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/recipe/recipe.component.html',
        styleUrls: ['app/recipe/recipe.component.css']
    }),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService, ingredient_service_1.IngredientService, router_1.Router, app_data_1.AppData])
], RecipeComponent);
exports.RecipeComponent = RecipeComponent;
//# sourceMappingURL=recipe.component.js.map