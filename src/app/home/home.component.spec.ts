import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { DataServiceService } from './data-service.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let testHomes = [{
    title: 'Home 2'
  },
  {
    title: 'Home 2'
  },
  {
    title: 'Home 2'
  }];

  beforeEach(async () => {
    let dataService1 = jasmine.createSpyObj<DataServiceService>('DataServiceService', {
      getHomes$: of(testHomes)
    });

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: DataServiceService, useValue: dataService1 }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges(); // onInit()
  });



  it('should show homes', () => {

    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3);
  });
  it('should show home info', () => {

    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test="title"]').innerText).toEqual('Home 2')
  });
});
