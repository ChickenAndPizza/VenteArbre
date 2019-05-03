import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DistributionPointService } from "app/_services";

export function existingDistributionPointValidator(id: string, distributionPointService: DistributionPointService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return distributionPointService.validatePoint(id, control.value).pipe(
      map(
        users => {
          return users ? { "pointExists": true } : null;
        })
    );
  };
}