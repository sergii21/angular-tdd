import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

fdescribe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.formGroup instanceof FormGroup).toBe(true);
  });

  it('should create a FormControl for each question', () => {
    component.questions = [
        {
            controlType: 'text',
            id: 'first',
            label: 'My First',
            required: false
        },
        {
            controlType: 'text',
            id: 'second',
            label: 'Second!',
            required: true
        }
    ];
    component.ngOnInit();

    expect(Object.keys(component.formGroup.controls)).toEqual([
        'first', 'second'
    ]);
});

});
