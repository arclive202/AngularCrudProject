import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
// import { HeroesService } from './heroes.service';
import { UserService } from '../user.service';
import { Observable, of } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private emailService: UserService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.emailService.isEmailTaken(ctrl.value).pipe(
      map(isTaken => (isTaken ? { 'UniqueEmail': true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
    selector: '[appUniqueEmail]',
    providers: [
      {
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => UniqueEmailValidator),
        multi: true
      }
    ]
  })
  export class UniqueEmailValidatorDirective {
    constructor(private validator: UniqueEmailValidator) {}
  
    validate(control: AbstractControl) {
      this.validator.validate(control);
    }
  }