import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
    route: string;
    selectedRecipe: Recipe;

    constructor() {}

    ngOnInit(): void {}

    onRecipeWasSelected(recipe: Recipe) {
        this.selectedRecipe = recipe;
    }
}
