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
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var RecipeService = (function () {
    function RecipeService(_http) {
        this._http = _http;
        this._recipeUrl = 'api/recipe/recipe.json';
        this._recipeIngredientUrl = 'api/recepieIngrediens/recipeIngredients.json';
    }
    RecipeService.prototype.save = function (value) {
        var jsonString = JSON.stringify(value);
    };
    RecipeService.prototype.saveRecipeIngredient = function (value) {
        var jsonString = JSON.stringify(value);
    };
    RecipeService.prototype.getRecepies = function () {
        return this._http.get(this._recipeUrl);
    };
    RecipeService.prototype.getIngredientsWithParam = function (value) {
        var params = new http_1.URLSearchParams();
        params.set('recipeId', value);
        return this._http.get(this._recipeIngredientUrl, params);
    };
    RecipeService.prototype.getRecipeIngredients = function () {
        return this._http.get(this._recipeIngredientUrl);
    };
    RecipeService.prototype.getOneRecepies = function (id) {
        return this.getRecepiesObservable()
            .map(function (recipies) { return recipies.find(function (p) { return p.recipeId == id; }); });
    };
    RecipeService.prototype.getRecepiesObservable = function () {
        return this._http.get(this._recipeUrl)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); });
    };
    RecipeService.prototype.delete = function (id) {
        // return this._http.delete(this._recipeIngredientUrl + id);
    };
    return RecipeService;
}());
RecipeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RecipeService);
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe.service.js.map