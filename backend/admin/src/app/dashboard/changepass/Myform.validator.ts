import { FormGroup } from '@angular/forms';
 
export class MyformValidator {
    static validate(myForm: FormGroup) {
        let newpass = myForm.controls.newpass.value;
        let cnfpass = myForm.controls.cnfpass.value;
 
        if (cnfpass.length <= 0) {
            return null;
        }
 
        if (cnfpass !== newpass) {
            return {
                doesMatchPassword: true
            };
        }
 
        return null;
 
    }
}