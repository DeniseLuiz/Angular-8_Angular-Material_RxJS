import { NgModule } from "@angular/core";
import { CommonModule} from '@angular/common';
import { InputTextComponent} from './input-text/input-text.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [ InputTextComponent, 
                    InputDateComponent, 
                    InputSelectComponent, 
                    InputNumberComponent, 
                    InputTextareaComponent],
    imports:[
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ]
    
})
export class CamposModule { }