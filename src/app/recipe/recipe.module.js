"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var recipe_component_1 = require("./recipe.component");
var recipe_service_1 = require("./recipe.service");
var ingredient_service_1 = require("../ingredient/ingredient.service");
var shared_module_1 = require("../shared/shared.module");
var RecipeModule = (function () {
    function RecipeModule() {
    }
    return RecipeModule;
}());
RecipeModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild([
                { path: 'addRecipe', component: recipe_component_1.RecipeComponent }
            ])
        ],
        declarations: [
            recipe_component_1.RecipeComponent
        ],
        providers: [
            recipe_service_1.RecipeService,
            ingredient_service_1.IngredientService
        ]
    })
], RecipeModule);
exports.RecipeModule = RecipeModule;
//# sourceMappingURL=recipe.module.js.map