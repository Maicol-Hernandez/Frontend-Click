import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CustomvalidatorsService {

  patternValidator(): ValidatorFn {
    return (control : AbstractControl) : { [key: string]: any } =>{
      
      if(!control.value){
        return null;
      }
      
      const regExp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valido = regExp.test(control.value);
      return valido ? null : { invalidPassword: true};
    
    };
}


MachPassword(password: string, confirmPassword: string) {
  return (forGroup: FormGroup) => { 
    const passwordControl = forGroup.controls[password];
    const confirmPasswordControl = forGroup.controls[confirmPassword];

    if(!passwordControl || !confirmPassword ) {
      return null;
    }

    if(confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }

    if(passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null)
    }
  }
}



  constructor() { }


}
