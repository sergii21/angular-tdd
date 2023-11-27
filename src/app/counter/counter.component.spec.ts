import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { click, expectText } from '../utilities/spec-helpers/element.spec-helper';
import { CounterComponent } from './counter.component';
import { CounterService } from './counter.service';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let incrementButton: DebugElement;
  let decrementButton: DebugElement;
  let count: DebugElement;
  let input: DebugElement;
  let inputBtn: DebugElement;
  const newCount = 123;
  let fakeCount$: BehaviorSubject<number>;
  let fakeCounterService: Pick<CounterService, keyof CounterService>;


  beforeEach(async () => {
    fakeCount$ = new BehaviorSubject(newCount);

    fakeCounterService = {
      getCount(): Observable<number> {
        return fakeCount$;
      },
      increment(): void {
        fakeCount$.next(newCount+1);
      },
      decrement(): void {
        fakeCount$.next(newCount-1);
      },
      reset(): void {
        fakeCount$.next(newCount);
      },
    };
    spyOn(fakeCounterService, 'getCount').and.callThrough();
    spyOn(fakeCounterService, 'increment').and.callThrough();
    spyOn(fakeCounterService, 'decrement').and.callThrough();
    spyOn(fakeCounterService, 'reset').and.callThrough();
    fakeCounterService.reset(newCount);


    await TestBed.configureTestingModule({
      imports: [CounterComponent],
      providers: [
        {provide: CounterService, useValue: fakeCounterService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    // component.startCount = newCount;
    incrementButton = fixture.debugElement.query(By.css('[data-test="increment-buttton"]'));
    decrementButton = fixture.debugElement.query(By.css('[data-test="decrement-buttton"]'));
    count = fixture.debugElement.query(By.css('[data-test="count"]'));
    input = fixture.debugElement.query(By.css('[data-test="input"]'));
    inputBtn = fixture.debugElement.query(By.css('[data-test="inputBtn"]'));
    component.ngOnChanges(); 
    fixture.detectChanges();
  }); 

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('show increment button', () => {
    expect(incrementButton)
      .toBeTruthy();
  });

  it('show count', () => {
    expect(count)
      .toBeTruthy();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', String(newCount));
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });

  it('show input', () => {
    expect(input).toBeTruthy();
  });

  it('increment the count', () => {
    //Act: click
    incrementButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert: Count = 1
    expect(fakeCounterService.increment).toHaveBeenCalled();
    expect(count.nativeElement.textContent) 
      .toBe(newCount+1+'');
  });
  it('decrement the count', () => {
    //Act: click
    click(fixture, 'decrement-buttton')
    fixture.detectChanges();
    //Assert: Count = -1
    expect(fakeCounterService.decrement).toHaveBeenCalled();
    expect(count.nativeElement.textContent)
      .toBe(newCount - 1+'');
  });

  it('reset count', () => {
    input.nativeElement.value = newCount;
    input.nativeElement.dispatchEvent(new Event('input'));
    inputBtn.triggerEventHandler('click');
    fixture.detectChanges();
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
    expect(count.nativeElement.textContent).toBe(String(newCount));
  });
  it('does not set count if value is not a number', () => {
    input.nativeElement.value = 'not a number';
    input.nativeElement.dispatchEvent(new Event('input'));
    inputBtn.triggerEventHandler('click');
    fixture.detectChanges();
    expect(count.nativeElement.textContent).toBe(String(newCount));
  });
  
  it('show inputBtn', () => {
    expect(inputBtn).toBeTruthy();
  });
  
  // it('emit countChange event on increment', () => {
  //   // Arrange
  //   let actualValue:number|undefined;
  //   component.countChange.subscribe((count)=>{
  //     actualValue = count
  //   });
  //   // Act
  //   incrementButton.triggerEventHandler('click');
  //   // Assert
  //   expect(actualValue).toBe(component.startCount+1)
  // });
  

});
