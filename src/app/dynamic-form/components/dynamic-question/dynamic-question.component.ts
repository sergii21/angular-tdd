import {
    Component,
    Input
} from '@angular/core';
import {
    FormGroup, ReactiveFormsModule
} from '@angular/forms';
import { Question } from '../../interfaces';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'dynamic-question',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './dynamic-question.component.html'
})
export class DynamicQuestionComponent {
    @Input() form!: FormGroup;
    @Input() question!: Question;

    get isValid(): boolean {
        return this.form.controls[this.question.id].valid;
    }
}
