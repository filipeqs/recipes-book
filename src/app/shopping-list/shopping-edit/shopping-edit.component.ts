import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
    @Output() addIngredient = new EventEmitter<Ingredient>();

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('amountInput') amountInput: ElementRef;

    constructor() {}

    ngOnInit(): void {}

    onAddIngredient() {
        const name = this.nameInput.nativeElement.value;
        const amount = this.amountInput.nativeElement.value;

        this.addIngredient.emit(new Ingredient(name, amount));

        this.nameInput.nativeElement.value = '';
        this.amountInput.nativeElement.value = '';
    }
}
