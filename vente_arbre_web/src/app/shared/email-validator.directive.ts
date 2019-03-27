import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { CustomerService } from "app/service/customer/customer.service";
import { map } from "rxjs/operators";

export function existingEmailValidator(id: string, customerService: CustomerService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return customerService.validateEmail(id, control.value).pipe(
      map(
        users => {
          return users ? { "emailExists": true } : null;
        })
    );
  };
}