import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { validarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-date',
  templateUrl: './input-date.component.html',
})
export class InputDateComponent {

  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validacao: validarCamposService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}