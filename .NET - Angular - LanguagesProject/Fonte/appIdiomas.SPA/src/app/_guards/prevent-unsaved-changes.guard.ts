import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserEditComponent } from '../users/user-edit/user-edit.component';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate <UserEditComponent> {
    canDeactivate(component: UserEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Deseja realmente sair da página? Mudanças feitas não foram salvas');
        }
        return true;
    }
}
