import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
/* Feature Modules */
import { ProductModule } from './products/product.module';
import { RecipeModule } from './recipe/recipe.module';

@NgModule({  
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([  
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: '**', redirectTo: 'products', pathMatch: 'full' }
    ]),
    ProductModule,RecipeModule
  ],  
  declarations: [
    AppComponent   
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }