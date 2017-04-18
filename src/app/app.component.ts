import { Component } from '@angular/core';
import { AppData } from './app.data'

@Component({
    selector: 'pm-app',
    template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>                   
                     <li><a [routerLink]="['/products']">Recipe List</a></li>
                     <li><a [routerLink]="['/addRecipe']">New recipe</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
     `,
    providers: [AppData]
})

export class AppComponent { }
