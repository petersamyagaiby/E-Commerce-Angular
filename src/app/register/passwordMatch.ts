import { AbstractControl } from '@angular/forms';

export function passwordMatch(password: string, confirmPassword: string) {
  return function (control: AbstractControl) {
    const passwordValue = control.get(password)?.value;
    const confirmPasswordValue = control.get(confirmPassword)?.value;
    if (passwordValue === confirmPasswordValue) {
      return null;
    }
    return { passwordMismatchError: true };
  };
}
