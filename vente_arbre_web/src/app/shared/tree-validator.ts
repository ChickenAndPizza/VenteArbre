import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TreeService } from "app/service/tree/tree.service";

export function existingTreeOfCategoryValidator(treeService: TreeService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return treeService.validateTreeOfCategory(control.value).pipe(
      map(
        treeExists => {
          return treeExists ? { "treeExists": true } : null;
        })
    );
  };
}