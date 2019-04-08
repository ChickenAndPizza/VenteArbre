import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TreeService, TreeCategoryService } from "app/_services";

export function existingTreeOfCategoryValidator(treeService: TreeService, treeCategoryService: TreeCategoryService, treeId: string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return treeService.validateTreeOfCategory(control.value, treeCategoryService.getCurrentCategory().id, treeId).pipe(
      map(
        treeExists => {
          return treeExists ? { "treeExists": true } : null;
        })
    );
  };
}