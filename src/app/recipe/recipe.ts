

export class Recipe {
    recipeId: number;
    recipeName: string;
    recipeSource: string;
    preparationTime: string;
    instructions: string;
    
}


export class RecipeFull {
    id:number;
    recipeId: number;
    recipeName: string;
    recipeSource: string;
    preparationTime: string;
    instructions: string;
    numberOfIngredients: number;
    ingredients: Ingredients[];
    
}

export class Ingredients {
    name: string;
    quantity: number;
}
