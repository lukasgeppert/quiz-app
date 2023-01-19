import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): null | { [key: string]: boolean } => {
        if (control.pristine) {
            return error;
        }
        const valid = regex.test(control.value);
        return valid ? null : error;
    };
}

export function lengthValidator(length: number): ValidatorFn {
    return (control: AbstractControl): null | { [key: string]: boolean } => {
        if (control.pristine) {
            return { length: true };
        }
        const valid = control.value.length >= length;
        return valid ? null : { length: true };
    };
}


export function passwordMatchvalidator(control: AbstractControl): null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const currentErrors = password?.errors || {};
    if (confirmPassword?.value.length === 0 || password?.value !== confirmPassword?.value)
        password?.setErrors({ ...currentErrors, passwordMismatch: true });
    else if (!currentErrors?.["length"])
        password?.setErrors(null);
    return null;
}