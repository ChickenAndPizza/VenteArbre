import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TreeService } from "app/_services";

export function canAddTreeValidator(treeService: TreeService, treeId: string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return treeService.validateCustomerOrderDetailTree( treeId, control.value).pipe(
      map(
        canAdd => {
          return canAdd ? null : { "cannotAddTree": true };
        })
    );
  };
}