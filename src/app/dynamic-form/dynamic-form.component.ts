import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Question } from './interfaces';
import { DynamicForm } from './types';
import { DynamicQuestionComponent } from './components/dynamic-question/dynamic-question.component';

interface FormType {
  label: FormControl<string>;
  value: FormControl<string>;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicQuestionComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  @Input() questions: Question[] = [
    {
        controlType: 'text-input',
        id: 'first',
        label: 'My First',
        required: true
    },
    {
        controlType: 'text-input',
        id: 'second',
        label: 'Second!',
        required: true
    }
];
  formGroup = this.generateForm(this.questions);
  payload: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.generateForm(this.questions);
  }

  private generateForm(questions: Array<Question>): FormGroup<FormType> {
    const formControls = questions.reduce(this.generateControl, {});

    return new FormGroup(formControls);
  }

  private generateControl(controls: any, question: Question) {
    if (question.required) {
      controls[question.id] = new FormControl(
        question.value || '',
        Validators.required
      );
    } else {
      controls[question.id] = new FormControl(question.value || '');
    }

    return controls;
  }

  saveForm() {
    const formValue: DynamicForm = this.formGroup.getRawValue();
  }

  submit() {
    this.payload = JSON.stringify(this.formGroup.value, null, 4);
  }
}
