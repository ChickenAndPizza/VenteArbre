import { FormGroup } from "@angular/forms";

export function checkPasswords(form: FormGroup): { [key: string]: boolean} | null {
    const password = form.get('password');
    const confirmPassword = form.get('passwordConfirm');
 
    return password && confirmPassword && password.value !== confirmPassword.value ?
     {'notSame': true} : null;
}