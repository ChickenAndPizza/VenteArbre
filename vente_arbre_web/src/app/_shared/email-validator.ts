import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CustomerService } from "app/_services";

export function existingEmailValidator(id: string, customerService: CustomerService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return customerService.validateEmailExisting(id, control.value).pipe(
      map(
        users => {
          return users ? { "emailExists": true } : null;
        })
    );
  };
}
