import { AbstractControl } from "@angular/forms";
import { stringify } from "querystring";

export function treeImageFormatValidator(control: AbstractControl): {[key: string]: any} | null {
    if(!control.value) {
        return null;
    }
    let type = control.value.toString().split('.');
    type = type[type.length-1];
    let typeArray = ['png','jpeg','jpg','gif'];
    let include = typeArray.includes(type);
    return include ? null : { "fileError": true } ;
}