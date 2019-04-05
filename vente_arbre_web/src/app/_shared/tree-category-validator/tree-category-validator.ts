import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TreeCategoryService } from "app/_services";

export function existingTreeCategoryValidator(treeCategoryService: TreeCategoryService, categoryId: string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return treeCategoryService.validateTreeCategory(control.value, categoryId).pipe(
      map(
        treeCategoryExists => {
          return treeCategoryExists ? { "treeCategoryExists": true } : null;
        })
    );
  };
}