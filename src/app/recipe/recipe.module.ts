import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { RecipeService } from './recipe.service';
import {IngredientService} from '../ingredient/ingredient.service'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'addRecipe', component: RecipeComponent }
    ])
  ],
  declarations: [
    RecipeComponent
  ],
  providers: [
    RecipeService,
    IngredientService
  ]
})
export class RecipeModule {}
