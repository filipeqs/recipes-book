import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shipping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedIntem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit(): void {
        this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
            this.editMode = true;
            this.editedItemIndex = index;
            this.editedIntem = this.shoppingListService.getIngredient(index);
            this.slForm.setValue({
                name: this.editedIntem.name,
                amount: this.editedIntem.amount,
            });
        });
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const ingredient = new Ingredient(value.name, value.amount);
        if (this.editMode)
            this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
        else this.shoppingListService.addIngredient(ingredient);

        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.editMode = false;
        this.slForm.reset();
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
