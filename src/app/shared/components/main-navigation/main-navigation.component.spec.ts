import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MainNavigationComponent } from './main-navigation.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('MainNavigationComponent', () => {
  let component: MainNavigationComponent;
  let fixture: ComponentFixture<MainNavigationComponent>;
  let el: DebugElement;
  let logo: DebugElement;
  let accountLink: DebugElement;
  let basketLink: DebugElement;
  let orderButton: DebugElement;
  let changeLangButton: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavigationComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    logo = el.query(By.css('#logo'));
    basketLink = el.query(By.css('#basketLink'));
    orderButton = el.query(By.css('#orderButton'));
    changeLangButton = el.query(By.css('#changeLangButton'));
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('shold have a logo', () => {
    expect(logo).toBeTruthy();
  });

});
