import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductCardListComponent } from './dashboard-product-card-list.component';

describe('DashboardProductCardListComponent', () => {
  let component: DashboardProductCardListComponent;
  let fixture: ComponentFixture<DashboardProductCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProductCardListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardProductCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
