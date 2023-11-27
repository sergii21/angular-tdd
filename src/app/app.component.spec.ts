import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;
  let counter: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockComponent(CounterComponent)],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    const counterEl = fixture.debugElement.query(By.directive(CounterComponent));
    counter = counterEl.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'angular-tdd' title`, () => {
    expect(component.title).toEqual('angular-tdd');
  });

  it('should render title', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-tdd');
  });

   describe('app-counter', () => {
    it('renders counter', () => {
      expect(counter).toBeTruthy();
    });
    it('passes startCount input', () => { 
      expect(counter.startCount).toBe(5);
     })
    it('listen countChange event', () => { 
      spyOn(console, 'log');
      console.log(counter);
      
      counter.countChange.emit(3);
      expect(console.log).toHaveBeenCalledWith(
        3
      ) 
     })
  });
  
});
