import { AbstractControl, ValidationErrors, AsyncValidator, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from "@angular/forms";
import { Directive, Injectable, Input } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerService } from "app/service/customer/customer.service";
import { map, catchError } from "rxjs/operators";

export function existingEmailValidator(customerService: CustomerService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return customerService.validateEmail(control.value).pipe(
        map(
        users => {
          return users ? {"emailExists": true} : null;
        })
      );
    };
  } 

@Directive({
    selector: '[emailExists][ngModel]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: ExistingEmailValidatorDirective,
        multi: true
    }]
})
export class ExistingEmailValidatorDirective implements AsyncValidator {
    constructor(private customerService: CustomerService) { }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return existingEmailValidator(this.customerService)(control);
    }
}   