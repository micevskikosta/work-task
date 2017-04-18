import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Ingredient,IngredientAdd } from './ingredient';

@Injectable()
export class IngredientService {
    private _ingredientUrl = 'api/ingredient/ingredient.json';
    ingredient: Ingredient[];
    constructor(private _http: Http) { }


    get(): Observable<Ingredient[]> {
        return this._http.get(this._ingredientUrl)
            .map((response: Response) => <Ingredient[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))

    }

      getAdd(): Observable<IngredientAdd[]> {
        return this._http.get(this._ingredientUrl)
            .map((response: Response) => <Ingredient[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))

    }

}
